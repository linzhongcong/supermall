<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: {
      message: {
        type: String,
        default: ""
      },
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .toast{
    /*width: 100px;*/
    /*height: 50px;*/
    padding: 10px;
    position: fixed;
    z-index: 9;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,0.75);
    color: #fff;
    font-size: 16px;
  }

</style>
