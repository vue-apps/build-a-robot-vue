import Vue from 'vue';
import Vuex from 'vuex';
import RobotsModule from '@/store/modules/robots';
import usersModule from '@/store/modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    robots: RobotsModule,
    users: usersModule,
  },
});
