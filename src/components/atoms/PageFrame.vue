<template>
  <div :class="$style.frame">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PageFrame',
});
</script>

<style lang="scss" module>
.frame {
  display: inline-block;
  max-width: 1100px;
  width: 70%;
}
</style>
