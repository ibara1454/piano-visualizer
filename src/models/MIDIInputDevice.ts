import { MIDIKeyTouch } from '@/models/MIDIKeyTouch';

export interface MIDIDevice {
  readonly id: string;

  readonly name: string;

  readonly manufacturer: string;

  attach(): void;

  distatch(): void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MIDIInputDevice extends MIDIDevice {
  state: {
    keys: MIDIKeyTouch[];
    pedal: boolean;
  }
}
