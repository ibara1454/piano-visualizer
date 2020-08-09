<template>
  <button :class="$style.button">
    <slot>
    </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'FlatButton',
});
</script>

<style lang="scss" module>
@import "~@/components/styles/colors";

.button {
  background: $primary-color;
  color: $reverse-color;
  border: 0;
  border-radius: 0;
  outline: 0;
  min-height: 40px;
  min-width: 120px;
  padding: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  transition: background .15s;

  &:hover {
    background: $secondary-color;
  }

  &:active {
    background: $accent-color;
  }
}
</style>
