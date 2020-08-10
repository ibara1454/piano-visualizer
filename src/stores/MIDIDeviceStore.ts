import { reactive } from '@vue/composition-api';
import MIDIKeyboardDevice from '@/models/MIDIKeyboardDevice';
import { MIDIKeyTouch } from '@/models/MIDIKeyTouch';
import { MIDIInputDevice } from '@/models/MIDIInputDevice';

export default class MIDIDeviceStore {
  // The key for injection.
  static key = Symbol('PianoStore');

  public state = reactive({
    activeDevice: undefined as MIDIInputDevice | undefined,
    devices: [] as MIDIInputDevice[],
    pressed: [] as MIDIKeyTouch[],
    pedal: false as boolean,
    error: undefined as string | undefined,
  });

  private midiAccess: WebMidi.MIDIAccess | undefined = undefined;

  /**
   * The event listener for listening the state changes of devices.
   * @param event The `WebMidi.MIDIConnectionEvent`. We declare the type with `Event`
   *  because the compatibility.
   */
  private listener: EventListener = (event: Event) => {
    const e = event as WebMidi.MIDIConnectionEvent;
    const { port } = e;
    // The device may be "input" or "output". We only need the "input" device.
    if (port.type !== 'input') { return; }
    const device = MIDIKeyboardDevice.create(port as WebMidi.MIDIInput);
    if (e.port.state === 'connected') {
      this.onDeviceConnect(device);
    } else {
      this.onDeviceDisconnect(device);
    }
  }

  /**
   * Connect to the web MIDI APIs and listen for the device change events.
   * Note that the request is asynchronous and may fail if the browser is not supported.
   */
  connect(): void {
    // Only call the api if it exists.
    if (!('requestMIDIAccess' in navigator)) {
      // Handle errors when web MIDI api not available on this browser.
      this.state.error = 'Your browser does not support Web MIDI';
      return;
    }
    // Request midi access only if it is not initialized.
    if (this.midiAccess === undefined) {
      // Connect and request all MIDI devices.
      navigator.requestMIDIAccess({ sysex: true })
        .then((midiAccess) => {
          // Initialize midi access.
          this.midiAccess = midiAccess;
          // Get the input device list.
          const devices = Array.from(midiAccess.inputs.values())
            .map(MIDIKeyboardDevice.create);
          // Connect all devices.
          devices.forEach((device) => this.onDeviceConnect(device));
          // Add event listener for listening devices change.
          // Note that this listener only listens realtime events.
          // Which means that existing devices will not trigger the connection evnet.
          this.midiAccess.addEventListener('statechange', this.listener);
        })
        .catch((error) => {
          // TODO: Better error handling.
          console.error(error);
          this.state.error = error;
        });
    }
  }

  /**
   * Disconnect the connection from listening devices.
   */
  disconnect() {
    if (this.midiAccess) {
      // Remove the listener from midiAccess.
      this.midiAccess.removeEventListener('statechange', this.listener);
      this.midiAccess = undefined;
    }
  }

  /**
   * Change the activeDevice activily.
   * @param device Any MIDI input device.
   */
  changeDevice(device: MIDIInputDevice) {
    // Do nothing if device is the same as activeDevice.
    if (this.state.activeDevice?.id === device.id) { return; }
    // Detach the current active device.
    if (this.state.activeDevice !== undefined) {
      this.detachDevice(this.state.activeDevice);
    }
    this.state.activeDevice = device;
    this.attachDevice(device);
  }

  /**
   * The callback function for new device connected.
   * @param device The new MIDI input device.
   */
  private onDeviceConnect(device: MIDIInputDevice) {
    // Check the device is not existing in the current device list.
    const matched = this.state.devices.find((d) => d.id === device.id);
    if (matched !== undefined) { return; }
    // Append it to the list.
    const devices = this.state.devices;
    this.state.devices = [...devices, device];
    // If the activeDevice does not exist.
    if (this.state.activeDevice === undefined) {
      this.state.activeDevice = device;
      this.attachDevice(device);
    }
  }

  /**
   * The callback function for device disconnected.
   * @param device The MIDI input device.
   */
  private onDeviceDisconnect(device: MIDIInputDevice) {
    // Remove the device from the list of devices if the port is a input device.
    const devices = this.state.devices;
    this.state.devices = devices.filter((d) => d.id !== device.id);
    // Set the activeDevice to undefined if the id matched.
    if (device.id === this.state.activeDevice?.id) {
      this.detachDevice(this.state.activeDevice);
      this.state.activeDevice = undefined;
    }
  }

  /**
   * Attach a new MIDIInputDevice to subscribe the key events.
   * @param device Any MIDIInputDevice which is not currently attached.
   */
  private attachDevice(device: MIDIInputDevice) {
    device.attach();
    device.keys.subscribe((keys) => { this.state.pressed = keys; });
    device.pedal.subscribe((pedal) => { this.state.pedal = pedal; });
  }

  /**
   * Detach a attached MIDIInputDevice and unsubscribe all key changes on it.
   * @param device A MIDI input device which is currently attached.
   */
  private detachDevice(device: MIDIInputDevice) {
    device.detach();
  }
}
