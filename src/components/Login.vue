<template>
  <div class="login">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="头像" srcset="" />
      </div>

      <div
        ref="loginfrom"
        label-width="0px"
        class="login_from"
        :model="from"
        
      >
        <el-input
          prefix-icon="iconfont icon-yonghufill"
          v-model="from.username"
          @blur="chkusername"
          min="3"
          max="6"
        >
        </el-input>
        <span v-show="from.namemsg" class="red">{{ from.namemsg }}</span>
        <el-input
          prefix-icon="iconfont icon-mima"
          v-model="from.password"
          type="password"
          class="password"
          @blur="chkpassword"
          min="6"
          max="15"
        >
        </el-input>
        <span v-show="from.passwordmsg" class="red">{{
          from.passwordmsg
        }}</span>

        <div class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetloginfrom">重置</el-button>
        
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      from: {
        username: "",
        password: "",
        namemsg: "",
        passwordmsg: "",
      },
    };
  },
  methods: {
    chkusername() {
      if (this.from.username == "") {
        this.from.namemsg = "请输入用户名";
        return;
      }
      if (this.from.username.length < 3 || this.from.username.length > 6) {
        this.from.namemsh = "字符长度为3到6个字符";
        return;
      }
      return this.from.username;
    },
    chkpassword() {
      if (this.from.password == "") {
        this.from.passwordmsg = "请输入密码";
        return;
      }
      if (this.from.password.length < 6 || this.from.username.length > 15) {
        this.from.passwordmsg = "字符长度为6到15个字符";
        return;
      }
      return this.from.password;
    },
    login() {
      let password = this.chkpassword();
      let name = this.chkusername();
      if (!name) {
        return;
      }
      if (!password) {
        return;
      }
      let params = new URLSearchParams();

      params.append("username", this.from.username);
      params.append("password", this.from.password);
      this.$http({
        method: "POST",
        url: `login`,
        data: params,
      }).then((res) => {
        console.log(res);
        console.log(res.data.code);
         if(res.data.code !=='200') return this.$message.error("登录失败！");
        //  if(res.data.code =='404') return this.$message.error("登录失败用户不存在！")
        //  if(res.data.code =='400') return this.$message.error("登录密码错误！")
         this.$message.success('登录成功')
         
         window.sessionStorage.setItem('name',res.data.session)
         window.sessionStorage.setItem('issuper',res.data.data[0].is_superuser)
        this.$router.push('/home')
      });
      
    },
    resetloginfrom(){
      this.from.username=""
      this.from.password=""
      this.from.passwordmsg = ""
      this.from.namemsg = ""
    }
  },
};
</script>

<style scoped>
.login {
  background-color: #2b5b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px, #ddd;
  position: relative;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.avatar_box img {
  width: inherit;
  height: inherit;
  border-radius: 50%;
  background-color: #eee;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_from {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  transform: translate(0, -17%);
  box-sizing: border-box;
}
.password {
  margin-top: 20px;
}
.el-button {
  margin-top: 20px;
}
.red {
  color: red;
  font-size: 10px;
}
</style>