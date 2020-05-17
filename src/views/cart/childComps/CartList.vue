<template>
    <div class="cart-list">
      <scroll class="content">
        <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"/>
      </scroll>
    </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll"
  import CartListItem from "./CartListItem"
  import {mapGetters} from 'vuex'

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
        ...mapGetters(['cartList'])
    },
    activated() {
      // 重新计算可滚动高度
      this.$refs.scroll.refresh()
    }
}
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px);
  }
.content{
  height: 100vh;
  /*很关键不然就看不到底部导航栏了*/
  overflow: hidden;
}
</style>
