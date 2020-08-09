<template>
  <div :class="$style.app">
    <PageFrame :class="$style.frame">
      <HeaderMenu />
      <MainPage />
    </PageFrame>

    <portal to="dialog">
      <template v-if="false">
        <div class="fullscreen">
          <div class="veil">
            <div class="dialog">
              <div class="content">
                CONTENT
              </div>
            </div>
          </div>
        </div>
      </template>
    </portal>

    <!-- The anchor of dialogs -->
    <portal-target name="dialog" class="destination" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import runInjection from '@/injection';
import PageFrame from '@/components/atoms/PageFrame.vue';
import HeaderMenu from '@/components/pages/HeaderMenu.vue';
import MainPage from '@/components/pages/MainPage.vue';

export default defineComponent({
  name: 'App',

  components: { PageFrame, HeaderMenu, MainPage },

  setup() {
    runInjection();
  },
});
</script>

<style lang="scss" module>
@import "~@/components/styles/colors";

.app {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $reverse-color;
}

.frame {
  position: absolute;
  width: 100%;
  height: 100%;
}

.destination {
  position: fixed;
  top: 0;
  left: 0;
}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.veil {
  position: relative;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .5);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  position: relative;
  width: 200px;
  height: 200px;
  background: green;
}
</style>
