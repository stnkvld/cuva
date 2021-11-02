import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import hotels from './hotels';

export default new Vuex.Store({
  modules: {
    hotels
  }
});
