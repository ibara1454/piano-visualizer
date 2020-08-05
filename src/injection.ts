import { provide } from '@vue/composition-api';
import MIDIDeviceStore from '@/stores/MIDIDeviceStore';

export default function () {
  provide(MIDIDeviceStore.key, new MIDIDeviceStore());
}
