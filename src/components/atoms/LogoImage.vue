<template>
  <div :class="$style.wrapper">
    <img :class="$style.icon" :src="iconImage">
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import iconImage from '@/assets/images/icon-64x64.png';

export default defineComponent({
  name: 'LogoImage',

  setup() {
    return { iconImage };
  },
});
</script>

<style lang="scss" module>
@import '~@/components/styles/colors';

.wrapper {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: $reverse-color;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>
