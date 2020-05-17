<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommendView",
    props: {
      recommends: {
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    padding: 15px 0 20px;
    border-bottom: 10px solid #eeeeee;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend-item img{
    width: 66px;
    height: 66px;
  }
  .recommend-item div{
    width: 100%;
    height: 20px;
    color: #000000;
    font-size: 12px;
    margin-top: 5px;
  }
</style>
