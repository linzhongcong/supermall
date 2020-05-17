<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购 物 车({{length}})</div>
    </nav-bar>
    <!--商品列表-->
    <cart-list/>
    <!--商品汇总-->
<!--    <bottom-bar/>-->
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import CartList from "./childComps/CartList"

  import { mapGetters } from "vuex"
  // import BottomBar from "./childComps/BottomBar"


  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      // BottomBar
    },
    computed: {
      //映射Vuex中的getters
      // 两种格式，无需另命名...mapGetters(['cartLength'])
      ...mapGetters({
        length: "cartLength"
      })
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
