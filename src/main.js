import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import pinDirective from '@/directives/pin-directive';

Vue.config.productionTip = false;
Vue.directive('pin', pinDirective);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
