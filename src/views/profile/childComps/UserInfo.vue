<template>
  <div id="user-info">
    <a href="#" class="clear-fix" v-show="isbgis">
      <slot name="user-icon">
        <svg class="privateImage-svg left">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
        </svg>
      </slot>
      <div class="login-info left" @click="landClick">
        <slot name="user-nickname">
          <span>登录</span>
          <span>/</span>
          <span>注册</span>
        </slot>
        <div class="phone">
          <span>
            <svg data-v-735ff1be="" fill="#fff" class="icon-mobile"><use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use></svg>
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <svg data-v-735ff1be="" fill="#fff" class="arrow-svg right"><use data-v-735ff1be="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg>
    </a>
    <img src="~assets/img/Profile/bgi2.jpg" v-show="isbgi">
  </div>
</template>

<script>
	export default {
		name: "UserInfo",
    data(){
		  return{
		    isbgi: false,
        isbgis: true
      }
    },
    created(){
      this.$bus.$on("btnClick",()=>{
        this.isbgis = false;
        this.isbgi = true
      })
    },
    methods:{
		  //跳转到登录界面
      landClick(){
        this.$router.push("/land")
      },
    }
	}
</script>

<style scoped>
  #user-info {
    height: 150px;
    background-color: var(--color-tint);
    margin-top: -5px;
  }

  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 30px;
  }

  .left {
    float: left;
    /*margin-left: 10px;*/
    margin-bottom: 10px;
  }

  #user-info .arrow-svg {
    width: 11px;
    height: 22px;
    margin-top: 18px;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  #user-info .login-info .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }

  #user-info .login-info .phone .icon-mobile {
    position: absolute;
    width: 12px;
    height: 18px;
    left: -15px;
    top: 0;
  }
  #user-info>img{
    position: absolute;
    top: 0;
    *zoom: 1;
    width: 100%;
    height: 200px;
  }
</style>
