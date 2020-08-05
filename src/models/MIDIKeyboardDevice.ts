/* eslint-disable no-bitwise */
import { MIDIInputDevice } from '@/models/MIDIInputDevice';
import {
  MIDIMessage, channelMask, noteOn, noteOff, damperPedal, pedalOffThreshold,
} from '@/models/MIDIMessage';
import { MIDIKeyTouch } from '@/models/MIDIKeyTouch';
import { reactive } from '@vue/composition-api';

export default class MIDIKeyboardDevice implements MIDIInputDevice {
  // TODO: implement this reactive state without Vue.js.
  //  Since this class is not a part of Vue's component.
  public state = reactive({
    keys: [] as MIDIKeyTouch[],
    pedal: false,
  })

  private listener: EventListener = (event: Event) => {
    const e = event as WebMidi.MIDIMessageEvent;
    const data = e.data;
    // TODO: Ensure that the MIDI message has length at least 3.
    const message: MIDIMessage = { first: data[0], second: data[1], third: data[2] };

    const { first, second, third } = message;
    // If the head part matches the "NOTE_ON" pattern.
    if ((first & ~channelMask) === noteOn) {
      // If the same note exists, then replace it by the new one.
      // TODO: implementation
      if (!this.state.keys.map((key) => key.note).includes(second)) {
        this.state.keys = [...this.state.keys, { note: second, velocity: third }];
      }
      // If the head part matches the "NOTE_OFF" pattern.
    } else if ((first & ~channelMask) === noteOff) {
      // Remove the note from list.
      this.state.keys = this.state.keys.filter((key) => key.note !== second);
      // If the head part matches the "DAMPER_PEDAL" pattern.
    } else if ((first & damperPedal) === damperPedal) {
      // Use the tail part to determine whether it is "PEDAL_ON" or "PEDAL_OFF".
      if (second <= pedalOffThreshold) {
        this.state.pedal = false;
      } else { // second >= pedalOnThreshold
        this.state.pedal = true;
      }
    }
    // Discard the note if it does not match any pattern from the above.

    console.log(this.state.keys);
  }

  private attached = false;

  constructor(
    readonly id: string,
    readonly name: string,
    readonly manufacturer: string, private device: WebMidi.MIDIInput,
  ) {}

  /**
   * Attach the device and add a listener for subscribing the MIDI messages.
   */
  attach(): void {
    if (this.attached === false) {
      this.device.addEventListener('midimessage', this.listener);
      this.attached = true;
    }
  }

  /**
   * Distatch the device and remove all listeners from it.
   */
  distatch(): void {
    if (this.attached === true) {
      this.device.removeEventListener('midimessage', this.listener);
      this.attached = false;
    }
  }
}
