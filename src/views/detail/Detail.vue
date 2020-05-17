<template>
  <div id="detail">
    <nav-bar class="detail-nav">
      <div slot="left" class="back" @click="backClick"><img src="~assets/img/common/back.svg"></div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="titleitem"
             :class="{active: currentIndex===index}" @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="scroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="reccommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addCart"/>

    <!--组件点击需要.native-->
    <back-top @click.native="backclick" v-show="isShowBackTop"/>

    <toast :message="message" :show="show"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"

  import GoodsList from "components/content/goods/GoodsList"


  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/content/backTop/BackTop"
  import Toast from "components/common/toast/Toast"


  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail"

  export default {
    name: "Detail",
    components: {
      NavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      GoodsList,

      Scroll,
      BackTop,
      Toast
    },
    data(){
      return {
        iid: null,
        titles: ["商品","参数","评论","推荐"],
        currentIndex: 0,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        isShowBackTop: false,
        message: "",
        show: false
      }
    },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid;

      //根据iid请求详情数据
      getDetail(this.iid).then(res =>{
        // console.log(res);
        //1.获取轮播图数据
        this.topImages = res.result.itemInfo.topImages;

        //2.获取商品信息
        this.goods = new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services);

        //3.创建店铺信息
        this.shop = new Shop(res.result.shopInfo);

        //4.获取商品详情信息
        this.detailInfo = res.result.detailInfo;

        //5.获取参数信息
        this.paramInfo = new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule);

        // 6.保存评论信息
        if (res.result.rate.cRate !== 0) {
          this.commentInfo = res.result.rate.list[0];
        }

        //解决图片不能滚动问题
        this.$bus.$on("DetailImagesLoad",()=>{
          this.$refs.scroll.scroll.refresh();

          //当详情数据加载完成，计算对应内容的offsetTop值
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.param.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.reccommend.$el.offsetTop);
          //添加一条最大值
          this.themeTopYs.push(Number.MAX_VALUE)

        })
      });

      //请求推荐数据
      getRecommend().then(res =>{
        console.log(res);
        this.recommends = res.data.list
      })
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;

        //监听导航栏按钮点击，跳转到对应区域
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
      },

      //后退一步
      backClick() {
        this.$router.back()
        //this.$router.go(-1)
      },

      scroll(position){
        // console.log(position);
        // 实现滚动到哪块区域，导航跟随改变
        const positoinY = -position.y;
        for (let i = 0;i<this.themeTopYs.length-1;i++){
          if (this.currentIndex !== i && (positoinY >= this.themeTopYs[i] && positoinY <this.themeTopYs[i+1])){
            this.currentIndex = i;
          }
        }

        //返回顶部按钮显示效果
        this.isShowBackTop = (-position.y) > 900;
      },
      backclick(){
        //返回顶部效果，需要拿到scroll中的scrollTo（水平，垂直，毫秒）
        this.$refs.scroll.scroll.scrollTo(0,0,500)
      },
      addCart(){
        //获取购物车需要展现的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.newPrice;
        product.iid = this.iid;

        //将商品添加到购物车
        this.$store.dispatch("addCart",product).then(res =>{

          //弹窗添加购物车成功
          this.show = true;
          this.message = res;

          setTimeout(() => {
            this.show = false
          },2000)
          // console.log(res);
        })
      }
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 13px;
  }
  .titleitem{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back{
    margin-top: 5px;
  }

  #detail{
    position: relative;
    z-index: 9999;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 99;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>
