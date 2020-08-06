<template>
  <div>
    <ul v-if="state.devices.length !== 0">
      <li v-for="device in state.devices" :key="device.id">
        {{ device.id }} - {{ device.name }} - {{ device.manufacturer }}
      </li>
    </ul>
    <VisualPiano :pressed="pressed.keys" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  watchEffect,
  computed,
} from '@vue/composition-api';
import VisualPiano from '@/components/VisualPiano.vue';
import MIDIDeviceStore from '@/stores/MIDIDeviceStore';

export default defineComponent({
  name: 'MainPage',

  components: { VisualPiano },

  setup() {
    const store = inject(MIDIDeviceStore.key) as MIDIDeviceStore;
    const { state } = store;

    watchEffect((onInvalidate) => {
      store.connect();
      onInvalidate(() => store.disconnect());
    });

    // eslint-disable-next-line arrow-body-style
    const pressed = computed(() => {
      return store.state.activeDevice ? store.state.activeDevice.state : { keys: [] };
    });
    return {
      pressed,
      state,
    };
  },
});
</script>

<style>

</style>
