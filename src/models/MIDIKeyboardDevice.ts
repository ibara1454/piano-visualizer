/* eslint-disable no-bitwise */
import { MIDIInputDevice } from '@/models/MIDIInputDevice';
import {
  MIDIMessage, channelMask, noteOn, noteOff, damperPedal, pedalOffThreshold,
} from '@/models/MIDIMessage';
import { MIDIKeyTouch } from '@/models/MIDIKeyTouch';
import { Observable, BehaviorSubject } from 'rxjs';

export default class MIDIKeyboardDevice implements MIDIInputDevice {
  #keys = new BehaviorSubject<MIDIKeyTouch[]>([]);

  #pedal = new BehaviorSubject<boolean>(false);

  get keys(): Observable<MIDIKeyTouch[]> { return this.#keys.asObservable(); }

  get pedal(): Observable<boolean> { return this.#pedal.asObservable(); }

  private listener: EventListener = (event: Event) => {
    const e = event as WebMidi.MIDIMessageEvent;
    const data = e.data;
    // TODO: Ensure that the MIDI message has length at least 3.
    const message: MIDIMessage = { first: data[0], second: data[1], third: data[2] };

    const { first, second, third } = message;
    // If the head part matches the "NOTE_ON" pattern.
    if ((first & ~channelMask) === noteOn) {
      // If the same note exists, then replace it by the new one.
      if (!this.#keys.getValue().map((key) => key.note).includes(second)) {
        const value = [...this.#keys.getValue(), { note: second, velocity: third }];
        this.#keys.next(value);
      }
      // If the head part matches the "NOTE_OFF" pattern.
    } else if ((first & ~channelMask) === noteOff) {
      // Remove the note from list.
      const value = this.#keys.getValue().filter((key) => key.note !== second);
      this.#keys.next(value);
      // If the head part matches the "DAMPER_PEDAL" pattern.
    } else if ((first & damperPedal) === damperPedal) {
      // Use the tail part to determine whether it is "PEDAL_ON" or "PEDAL_OFF".
      if (second <= pedalOffThreshold) {
        this.#pedal.next(false);
      } else { // second >= pedalOnThreshold
        this.#pedal.next(true);
      }
    }
    // Discard the note if it does not match any pattern from the above.
  }

  private attached = false;

  constructor(
    private device: WebMidi.MIDIInput,
  // eslint-disable-next-line no-empty-function
  ) {}

  /**
   * The device id.
   */
  get id(): string { return this.device.id; }

  /**
   * The device name.
   * Returns "unknown" if the device name is not set.
   */
  get name(): string { return this.device.name || 'unknown'; }

  /**
   * The device manufacturer.
   * Returns "unknown" if the device manufacturer is not set.
   */
  get manufacturer(): string { return this.device.manufacturer || 'unknown'; }

  /**
   * The factory method which creates a new MIDIKeyboardDevice.
   * @param device The native MIDI input device.
   * @return A new MIDIKeyboardDevice.
   */
  static create(device: WebMidi.MIDIInput): MIDIKeyboardDevice {
    return new MIDIKeyboardDevice(device);
  }

  /**
   * Attach the device and add a listener for subscribing the MIDI messages.
   */
  attach(): void {
    if (this.attached === false) {
      this.#keys = new BehaviorSubject<MIDIKeyTouch[]>([]);
      this.#pedal = new BehaviorSubject<boolean>(false);
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
      this.#keys.complete();
      this.#pedal.complete();
      this.attached = false;
    }
  }
}
