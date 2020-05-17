<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/Tabbar/home.svg">
      <img slot="item-icon-active" src="~assets/img/Tabbar/home_active.svg">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/Tabbar/category.svg">
      <img slot="item-icon-active" src="~assets/img/Tabbar/category_active.svg">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/Tabbar/shopcart.svg">
      <img slot="item-icon-active" src="~assets/img/Tabbar/shopcart_active.svg">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/Tabbar/profile.svg">
      <img slot="item-icon-active" src="~assets/img/Tabbar/profile_active.svg">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "components/common/tabBar/TabBar";
  import TabBarItem from "components/common/tabBar/tabBarItem"
  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>
