<template>
  <div id="app">
    <!--exclude="Detail"是把detail排除在外，因，每点击一个item。对应着一个详情 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>

    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from "components/content/mainTabBar/MainTabBar"

  export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "./assets/css/base.css";
</style>
