<template>
  <div :class="$style.page">
    <!-- <ul v-if="state.devices.length !== 0">
      <li v-for="device in state.devices" :key="device.id">
        {{ device.id }} - {{ device.name }} - {{ device.manufacturer }}
      </li>
    </ul> -->
    <VisualPiano :pressed="state.pressed" :pedal="state.pedal" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  watchEffect,
} from '@vue/composition-api';
import VisualPiano from '@/components/organisms/VisualPiano.vue';
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

    return {
      state,
    };
  },
});
</script>

<style lang="scss" module>
@import '~@/components/styles/colors';

.page {
  padding: 40px 20px;
  background: $theme-color;
}
</style>
