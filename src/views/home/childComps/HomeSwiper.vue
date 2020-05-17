<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.link">
      <a :href="item.link">
        <!-- @load="imageLoad监听轮播图是否加载完"-->
        <img :src="item.image" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data(){
      return {
        isLoad: false,
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad(){
        //默认请求四次，因四张图片，性能问题，请求一次就好..
        if(!this.isLoad){
          this.$emit("swiperImageLoad");
            this.isLoad = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
