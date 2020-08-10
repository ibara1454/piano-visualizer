<template>
  <div :class="$style.block">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PageBlock',
});
</script>

<style lang="scss" module>
@import '~@/components/styles/colors';

.block {
  padding: 40px 20px;
  background: $theme-color;
}
</style>
