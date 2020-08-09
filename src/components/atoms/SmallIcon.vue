<template>
  <font-awesome-icon :icon="icon" :size="size" />
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SmallIcon',

  components: { FontAwesomeIcon },

  props: {
    icon: {
      // type: Object as PropType<string | Array<string>>,
      required: true,
    },
    size: {
      type: String,
      required: false,
      default: 'lg',
    },
  },
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
  padding: 10px 20px;
  letter-spacing: 1.2px;
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
