import Vue from 'vue'
import App from './App'
import router from "./router"
import store from "./store"

import FastClick from "fastclick"
import VueLazyLoad from "vue-lazyload"

Vue.config.productionTip = false;

//事件总线，解决不是父子关系之间的传递
Vue.prototype.$bus = new Vue();

//解决移动端300ms延迟
FastClick.attach(document.body);

//使用懒加载插件
Vue.use( VueLazyLoad,{
  //占位图片
  loading: require("./assets/img/common/placeholder.png")
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});


