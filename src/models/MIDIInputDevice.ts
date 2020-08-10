import { MIDIKeyTouch } from '@/models/MIDIKeyTouch';
import { Observable } from 'rxjs';

export interface MIDIDevice {
  readonly id: string;

  readonly name: string;

  readonly manufacturer: string;

  attach(): void;

  distatch(): void;
}

export interface MIDIInputDevice extends MIDIDevice {
  keys: Observable<MIDIKeyTouch[]>;

  pedal: Observable<boolean>;
}
