<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         class="tab-control-item" :class="{active: index === currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default(){
          return []
        }
      },
      click: {
        type: Array,
      }
    },
    data(){
      return{
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index){
       this.currentIndex = index;

       //当发生点击，要把它传出去，因home中要展示对应的模块
        this.$emit("tabClick",index);
      },
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: #ffffff;
  }
  .tab-control-item{
    flex: 1;
    font-size: 15px;
  }
  .tab-control-item span{
    padding: 6px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 2px solid var(--color-tint);
  }
</style>
