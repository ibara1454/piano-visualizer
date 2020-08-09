<template>
  <div :class="[$style.menu]">
    <MainLogo />

    <FlatButton :class="[$style.button]">
      <!-- Shows "NO DEVICE" when no device detected. -->
      <template v-if="state.activeDevice === undefined">
        <SmallIcon :icon="faPlug" />
        <p>No device</p>
      </template>
      <!-- Otherwise, shows the device name -->
      <template v-else>
        <img :class="$style.keyboard" :src="KeyboardIcon" />
        <p>{{ state.activeDevice.name }}</p>
      </template>
    </FlatButton>

    <FlatButton :class="[$style.button]">
      <SmallIcon :icon="faCog" />
      <p>Settings</p>
    </FlatButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@vue/composition-api';
import MIDIDeviceStore from '@/stores/MIDIDeviceStore';
import PageFrame from '@/components/atoms/PageFrame.vue';
import FlatButton from '@/components/atoms/FlatButton.vue';
import SmallIcon from '@/components/atoms/SmallIcon.vue';
import { faPlug, faCog } from '@fortawesome/free-solid-svg-icons';
import MainLogo from '@/components/molecules/MainLogo.vue';
import KeyboardIcon from '@/assets/images/keyboard.svg';

export default defineComponent({
  name: 'HeaderMenu',

  components: {
    PageFrame, FlatButton, SmallIcon, MainLogo,
  },

  setup() {
    const store = inject(MIDIDeviceStore.key) as MIDIDeviceStore;
    const { state } = store;
    return {
      state, faPlug, faCog, KeyboardIcon,
    };
  },
});
</script>

<style lang="scss" module>
@import "~@/components/styles/colors";

.flex {
  display: flex;
}

.center {
  justify-content: center;
  align-items: center;
}

.menu {
  background: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
}

.button > * {
  padding: 0 5px;
}

.keyboard {
  height: 1.5em;
}

</style>
