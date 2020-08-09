<template>
  <div :class="$style.container">
    <LogoImage />
    <h1 :class="$style.title">Piano Visualizer</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import LogoImage from '@/components/atoms/LogoImage.vue';

export default defineComponent({
  name: 'MainLogo',

  components: { LogoImage },
});
</script>

<style lang="scss" module>
@import '~@/components/styles/fonts';

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  padding: 0 20px;
  font-size: 1.5rem;
  font-family: 'Kaushan Script', cursive;
}
</style>
