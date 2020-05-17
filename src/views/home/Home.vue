<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">乐购</div></nav-bar>

    <tab-control class="tab-control" :titles="['流行','新款','精选']"
                 @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>

    <!--一般scroll都需要设定范围-->
    <scroll class="content" ref="scroll" :probe-type="3"
            @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="goods[currrentType].list"/>
    </scroll>

    <!--组件点击需要.native-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"

  import HomeSwiper from  "./childComps/HomeSwiper"
  import HomeRecommendView from "./childComps/HomeRecommendView"
  import FeatureView from "./childComps/featureView"
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/content/backTop/BackTop"

  import {getHomeMultidata,getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      //保存数据，以便下次调用。因函数执行完，会释放数据，
      return {
        //1.轮播图以及推荐数据
        banners: [],
        recommends: [],
        //2.流行、新款、精选的数据
        goods: {
          //pop是第几页，list是多少条数据
          "pop": {page: 0, list: []},
          "new": {page: 0, list: []},
          "sell": {page: 0, list: []},
        },
        currrentType: "pop",
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },

    //生命周期函数,因，一旦组件创建出来，就要请求到数据
    created() {
      //1.请求多个数据
      this.getHomeMultidata();

      //2.请求流行、新款、精选的数据
      this. getHomeGoods("pop");
      this. getHomeGoods("new");
      this. getHomeGoods("sell");

      //解决图片不能滚动问题
      this.$bus.$on("itemImagesLoad",()=>{
        this.$refs.scroll.scroll.refresh()
      })
    },
    destroyed(){
      //console.log("销毁");
    },
    // 记录活跃状态
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      this.$refs.scroll.refresh()
    },
    //记录离开状态
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },

    methods: {
      tabClick(index){
         switch (index) {
           case 0:
             this.currrentType = "pop";
             break;
           case 1:
             this.currrentType = "new";
             break;
           case 2:
             this.currrentType = "sell";
             break;
         }
         //记录最新信息
         this.$refs.tabControl1.currentIndex = index;
         this.$refs.tabControl2.currentIndex = index;
      },

      //解决图片不能拖
      // imagesLoad(){
      //   this.$refs.scroll.refresh()
      // },

      backClick(){
        //返回顶部效果，需要拿到scroll中的scrollTo（水平，垂直，毫秒）
         this.$refs.scroll.scroll.scrollTo(0,0,500)
      },

      contentScroll(position){
        //返回顶部按钮显示效果
        this.isShowBackTop = (-position.y) > 900;

        //tab-control吸顶效果
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },

      loadMore(){
        //哪个页面需要上拉加载更多
        this.getHomeGoods(this.currrentType)
      },

      swiperImageLoad(){
        //所有组件都有$el,用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },


      /**
       * 网络请求相关的方法
       */
      //因axiso返回值为promise,所以可以直接调用then
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;

          this.recommends = res.data.recommend.list;
        });
      },

      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          console.log(res);
          //取出数据，插入对应的type中
          this.goods[type].list.push(...res.data.list);
          //把对应的页码+1，刚开始为0
          this.goods[type].page += 1;

          //如需要无限上拉加载，需调用scroll中的finishPullUp，加载一次，不在加载，无需调用
          this.$refs.scroll.scroll.finishPullUp()
        })
      }
    },
  }
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /*一开始用原生滚动，需要定位，用到scroll滚动，则不用*/
    /*position: fixed;*/
    /*top: 0;*/
    /*right: 0;*/
    /*left: 0;*/
    /*z-index: 99;*/
  }

  /*.tab-control{*/
  /*  !* position: sticky吸顶效果，需传入top值，但加入scroll就不起效果*!*/
  /*  position: sticky;*/
  /*  top:44px;*/
  /*  z-index: 99;*/
  /*  box-shadow: 0 1px 10px #f4f4f4;*/
  /*  margin-top: 10px;*/
  /*}*/

  .content{
    /*scroll滚动范围，一般scroll都需要设定范围，这个是除了nav与tab之外*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 999;
    font-size: 15px;
    margin-bottom: 5px;
    display: none;
  }
  /*以下代码也可以实现croll滚动范围*/
  /*.content{*/
  /*  height: calc(100% - 93);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
