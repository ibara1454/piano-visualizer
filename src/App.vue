<template>
  <div id="app">
    <MainPage />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import runInjection from '@/injection';
import MainPage from '@/pages/MainPage.vue';

export default defineComponent({
  name: 'App',

  components: { MainPage },

  setup() {
    runInjection();
  },
});
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
