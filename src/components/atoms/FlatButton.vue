<template>
  <button :class="$style.button" :disabled="disabled">
    <slot>
    </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

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
  font-weight: 400;
  font-family: 'Roboto', sans-serif;
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

  &:disabled {
    background: $primary-color;
    color: $disabled-color;
  }
}
</style>
