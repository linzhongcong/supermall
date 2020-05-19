<template>
  <div id="land">
    <img src="~assets/img/Profile/bgi.jpg">
    <div class="post">
      <h1>Welcome</h1>
      <div class="box">
        <div>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：<input type="text" placeholder="请输入账号" class="text"></div>
        <div>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：<input type="password" placeholder="请输入密码" class="paw"></div>
        <div>确认密码：<input type="password" placeholder="请确认密码" class="paws"></div>
        <p v-show="texts">两次密码不一致</p>
        <div class="button" @click="btn" >登&nbsp;&nbsp;&nbsp;&nbsp;录</div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: "Land",
    data(){
      return{
        texts: false
      }
    },
    methods:{
      btn(){
        let Text  = document.querySelector(".text");
        let Paw  = document.querySelector(".paw");
        let Paws  = document.querySelector(".paws");
        Paw.value === Paws.value? Text.value >= 1 && Paw.value >= 1 && Paws.value >= 1? this.$router.back():false : this.texts = true;
        this.$bus.$emit("btnClick");
      }
    }
  }
</script>

<style scoped>
  #land{
    position: relative;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow: hidden;
  }
  #land>img{
    width: 100%;
    height: 100vh;
  }
  #land>.post{
    width: 80%;
    height: 80%;
    position: absolute;
    top: 10%;
    left: 10%;
  }
  #land>.post>h1{
    font-size: 25px;
    color: #fff;
    margin-left: 50%;
    transform: translate(-50px);
  }
  #land>.post>.box>div{
    margin-top: 40px;
    color: #fff;
  }
  #land>.post>.box>div>input{
    height: 25px;
  }
  #land>.post>.box>.button{
    width: 150px;
    height: 30px;
    margin-top: 60px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #f5f5f5;
    margin-left: 17%;
    font-weight: bolder;
  }
  #land>.post>.box>p{
    margin-top: 5px;
    color: red;
  }

</style>
