import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';
import PortalVue from 'portal-vue';
import App from './App.vue';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(VueCompositionAPI);
// Portal-Vue
// https://github.com/LinusBorg/portal-vue
Vue.use(PortalVue);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
