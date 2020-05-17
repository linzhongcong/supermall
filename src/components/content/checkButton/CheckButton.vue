<template>
    <div class="check-button">
      <img src="~assets/img/Cart/tick.svg" alt="" :class="{checked:isChecked}">
    </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props:{
      isChecked:{
          type:Boolean,
          default:false
      }
    }
  }
</script>

<style scoped>
  .check-button img{
    border: 2px solid #eee;
    border-radius: 50%;
  }
  .checked{
    background-color:red;
    border-color: #ff8198;
  }
</style>
