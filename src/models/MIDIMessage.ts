// MIDI Message specification
// See
// - https://www.midi.org/specifications-old/item/table-1-summary-of-midi-message
// - https://www.midi.org/specifications-old/item/table-2-expanded-messages-list-status-bytes
// - https://www.midi.org/specifications-old/item/table-3-control-change-messages-data-bytes-2
// - https://newt.phys.unsw.edu.au/jw/notes.html

export type MIDIMessage = {
  first: number;
  second: number;
  third: number;
}

export const channelMask = 0x0f;

export const noteOff = 0x80;

export const noteOn = 0x90;

export const damperPedal = 0x40;

export const pedalOnThreshold = 0x40;

export const pedalOffThreshold = 0x3f;
