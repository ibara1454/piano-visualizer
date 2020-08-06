import { MIDIKeyTouch } from '@/models/MIDIKeyTouch';
import { Observable } from 'rxjs';

export interface MIDIDevice {
  readonly id: string;

  readonly name: string;

  readonly manufacturer: string;

  attach(): void;

  distatch(): void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MIDIInputDevice extends MIDIDevice {
  keys: Observable<MIDIKeyTouch[]>;

  pedal: Observable<boolean>;
}
