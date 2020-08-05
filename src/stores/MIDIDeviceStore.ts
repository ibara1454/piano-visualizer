import { reactive } from '@vue/composition-api';
import MIDIKeyboardDevice from '@/models/MIDIKeyboardDevice';
import { MIDIInputDevice } from '@/models/MIDIInputDevice';

export default class MIDIDeviceStore {
  static key = Symbol('PianoStore');

  public state = reactive({
    activeDevice: undefined as MIDIInputDevice | undefined,
    devices: [] as MIDIInputDevice[],
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
    if (e.port.state === 'connected') {
      this.onDeviceConnect(e.port);
    } else {
      this.onDeviceDisconnect(e.port);
    }
  }

  /**
   * Connect to the web MIDI APIs and listen for the device change events.
   */
  connect(): void {
    // Only call the api if it exists.
    if (!('requestMIDIAccess' in navigator)) {
      // Handle errors when web MIDI api not available on this browser.
      this.state.error = 'Your browser does not support Web MIDI';
    }
    if (this.midiAccess === undefined) {
      // Connect and request all MIDI devices.
      navigator.requestMIDIAccess({ sysex: true })
        .then((midiAccess) => {
          this.midiAccess = midiAccess;
          // Get the connected devices.
          const devices = Array.from(midiAccess.inputs.values())
            .map((input) => new MIDIKeyboardDevice(
              input.id,
              input.name || 'unknown',
              input.manufacturer || 'unknown',
              input,
            ));
          this.state.devices = devices;
          // If the device list is not empty, then let the first device to be the activeDevice.
          if (devices.length !== 0 && this.state.activeDevice === undefined) {
            this.state.activeDevice = this.state.devices[0];
            this.state.activeDevice.attach();
          }
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
   * The callback function for new device connected.
   * @param port The new MIDI device.
   */
  private onDeviceConnect(port: WebMidi.MIDIPort) {
    if (port.type !== 'input') { return; }
    const matched = this.state.devices.find((device) => device.id === port.id);
    if (matched !== undefined) { return; }
    // Append to device list if the port is a input device.
    const devices = this.state.devices;
    const device = new MIDIKeyboardDevice(
      port.id,
      port.name || 'unknown',
      port.manufacturer || 'unknown',
      port as WebMidi.MIDIInput,
    );
    this.state.devices = [...devices, device];
    // If the activeDevice does not exist.
    if (this.state.activeDevice === undefined) {
      this.state.activeDevice = device;
      device.attach();
    }
  }

  /**
   * The callback function for device disconnected.
   * @param port The MIDI device.
   */
  private onDeviceDisconnect(port: WebMidi.MIDIPort) {
    if (port.type !== 'input') { return; }
    // Remove the device from the list of devices if the port is a input device.
    const devices = this.state.devices;
    this.state.devices = devices.filter((d) => d.id !== port.id);
    // Set the activeDevice to undefined if the id matched.
    if (port.id === this.state.activeDevice?.id) {
      this.state.activeDevice.distatch();
      this.state.activeDevice = undefined;
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
   * @param device Any MIDI device.
   */
  changeDevice(device: MIDIKeyboardDevice) {
    if (this.state.activeDevice?.id === device.id) { return; }
    if (this.state.activeDevice !== undefined) {
      this.state.activeDevice.distatch();
    }
    this.state.activeDevice = device;
    device.attach();
  }
}
