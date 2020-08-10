<template>
  <div :class="{
    [$style.alert]: true,
    [$style.warning]: warning,
    [$style.info]: info,
    [$style.success]: success,
  }">
    <SmallIcon :icon="icon" size="sm" />
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import SmallIcon from '@/components/atoms/SmallIcon.vue';
import {
  faExclamationTriangle, faInfoCircle, faCheckCircle, faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

export default defineComponent({
  name: 'AlertMessage',

  props: {
    message: {
      type: String,
      required: true,
    },
    warning: {
      type: Boolean,
      required: false,
      default: false,
    },

    info: {
      type: Boolean,
      required: false,
      default: false,
    },

    success: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  components: { SmallIcon },

  setup(props) {
    const icon = computed(() => {
      if (props.warning) { return faExclamationTriangle; }
      if (props.info) { return faInfoCircle; }
      if (props.success) { return faCheckCircle; }
      // Fallback to the default icon.
      return faQuestionCircle;
    });
    return { icon };
  },
});
</script>

<style lang="scss" module>
@import '~@/components/styles/colors';
@import '~@/components/styles/sizes';

$icon-size: 30px;

.alert {
  padding: $medium-space $medium-space;
  display: inline-block;
  background: $theme-color;
  border-radius: $small-round;
  background: grey;
}

.warning {
  background: $warning-color;
}

.info {
  background: $info-color;
}

.success {
  background: $success-color;
}
</style>
