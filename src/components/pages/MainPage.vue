<template>
  <div :class="$style.page">
    <!-- Error message -->
    <transition
      appear
      :appear-class="$style.appear"
      :appear-to-class="$style['appear-to']"
      :appear-active-class="$style['appear-active']"
    >
      <div v-if="state.error">
        <AlertMessage
          warning
          :message="state.error">
        </AlertMessage>
      </div>
    </transition>

    <PageBlock>
      <VisualPiano :pressed="state.pressed" :pedal="state.pedal" />
    </PageBlock>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  watchEffect,
} from '@vue/composition-api';
import AlertMessage from '@/components/atoms/AlertMessage.vue';
import PageBlock from '@/components/atoms/PageBlock.vue';
import VisualPiano from '@/components/organisms/VisualPiano.vue';
import MIDIDeviceStore from '@/stores/MIDIDeviceStore';

export default defineComponent({
  name: 'MainPage',

  components: { AlertMessage, PageBlock, VisualPiano },

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
@import "~@/components/styles/sizes";

.page > * {
  margin: $medium-space 0;
}

.appear {
  transform: translateY(5px);
}

.appear-to {
  transform: translateY(0);
}

.appear-active {
  transition: all .8s ease-out;
}

</style>
