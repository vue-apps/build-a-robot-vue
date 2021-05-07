import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import pinDirective from '@/directives/pin-directive';
import currencyFilter from '@/components/filters/currency-filter';

Vue.config.productionTip = false;
Vue.directive('pin', pinDirective);
Vue.filter('currency', currencyFilter);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
