import  Vue from "vue"
import Vuex from "vuex"

import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex);

const state = {
  //搞个数组用于保存商品，如商品1、商品2.。。。
  cartList: [],
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store

