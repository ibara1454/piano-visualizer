<template>
  <div :class="[$style.menu]">
    <MainLogo />

    <FlatButton :class="[$style.button]">
      <span>Icon</span>
      <p>No device</p>
    </FlatButton>

    <FlatButton :class="[$style.button]">
      <span>Icon</span>
      <p>Settings</p>
    </FlatButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@vue/composition-api';
import MIDIDeviceStore from '@/stores/MIDIDeviceStore';
import PageFrame from '@/components/atoms/PageFrame.vue';
import FlatButton from '@/components/atoms/FlatButton.vue';
import MainLogo from '@/components/molecules/MainLogo.vue';

export default defineComponent({
  name: 'HeaderMenu',

  components: { PageFrame, FlatButton, MainLogo },

  setup() {
    const store = inject(MIDIDeviceStore.key) as MIDIDeviceStore;
    const { state } = store;
    return { state };
  },
});
</script>

<style lang="scss" module>

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

</style>
