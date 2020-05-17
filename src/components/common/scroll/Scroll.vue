<template>
  <div class="wrapper" ref="wrapper">
    <!-- scroll：必须外面包裹一层父元素 与 给它一个滚动区域 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll"

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    //在模板渲染成html后调用，用于挂载某个功能
    mounted() {
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        //监听页面滚动的距离，0/1表示不监听，2，鼠标在滚动范围监听，3随时监听
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });

      //2.监听滚动位置
      this.scroll.on("scroll",(position) =>{
        this.$emit("scroll",position)
      });

      //3.监听上拉加载事件
      this.scroll.on("pullingUp",() =>{
        this.$emit("pullingUp")
      })
    },
    methods: {
      //记录离开的Y值
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      },

      //记录X,Y值，多久回到
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },

      //更新数据
      refresh(){
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
