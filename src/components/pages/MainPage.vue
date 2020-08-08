<template>
  <div>
    <HeaderMenu />
    <ul v-if="state.devices.length !== 0">
      <li v-for="device in state.devices" :key="device.id">
        {{ device.id }} - {{ device.name }} - {{ device.manufacturer }}
      </li>
    </ul>
    <VisualPiano :pressed="state.pressed" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  watchEffect,
} from '@vue/composition-api';
import HeaderMenu from '@/components/organisms/HeaderMenu.vue';
import VisualPiano from '@/components/organisms/VisualPiano.vue';
import MIDIDeviceStore from '@/stores/MIDIDeviceStore';

export default defineComponent({
  name: 'MainPage',

  components: { HeaderMenu, VisualPiano },

  setup() {
    const store = inject(MIDIDeviceStore.key) as MIDIDeviceStore;
    const { state } = store;

    watchEffect((onInvalidate) => {
      store.connect();
      onInvalidate(() => store.disconnect());
    });

    return {
      state,
    };
  },
});
</script>

<style>

</style>
