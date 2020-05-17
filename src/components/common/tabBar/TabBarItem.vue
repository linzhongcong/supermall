<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 不活跃状态下的-->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <!-- 活跃状态下的-->
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: "deepPink"
      }
    },
    computed: {
      isActive(){
       /*判断活跃状态的path，是否与我的this path对应
       !== -1表示为true，== -1为false
        */
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        //判断是否处于活跃状态，如活跃状态就给它颜色，否则，为空对象
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      //切换路由
      itemClick(){
        this.$router.replace(this.path)
      }
    }
  }

</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
  }
  .tab-bar-item img{
    width: 22px;
    height: 20px;
  }
</style>
