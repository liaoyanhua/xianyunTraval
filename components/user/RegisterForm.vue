<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" v-model="form.password" type="password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPass">
      <el-input placeholder="确认密码" v-model="form.checkPass" type="password"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "",
        nickname: "",
        captcha: "",
        password: "",
        checkPass: ""
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名手机", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        checkPass: [{ validator: validatePass, trigger: "blur" }],
        nickname: [
          { required: true, message: "请输入你的名字", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 8, message: "长度在 5 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 发送验证码
   async handleSendCaptcha() {
      if (!this.form.username)
        return this.$message.error("请输入正确的用户名手机号");
      //原来获取验证码的方式

      // let res=await this.$axios({
      //     url:'/captchas',
      //     method:'POST',
      //     data:{tel:this.form.username}
      // })
      // if(res.status===200){
      //     let {code} = res.data;
      //          this.$alert(`这是验证码：${code}`, '验证码', {
      //   confirmButtonText: '确定',
      //   callback: action => {
      //     this.form.captcha=code;
      //   }
      // });
      // }

      //在vuex中通过actions异步获取验证码的方式，因为后面也要用到发送验证码的方式，故这里可以给它进行提取
      let res=await this.$store.dispatch("user/register", this.form.username)
      if(res.status===200){
          let {code} = res.data;
               this.$alert(`这是验证码：${code}`, '验证码', {
        confirmButtonText: '确定',
        callback: action => {
          this.form.captcha=code;
        }
      });
      }

      //普通的获取方式
      // this.$store.dispatch("user/register", this.form.username).then(res=>{
      //    if(res.status===200){
      //     let {code} = res.data;
      //          this.$alert(`这是验证码：${code}`, '验证码', {
      //   confirmButtonText: '确定',
      //   callback: action => {
      //     this.form.captcha=code;
      //   }
      // });
      // }
      // })
    },

    // 注册
    handleRegSubmit() {
      delete this.form.checkPass;
      this.$refs.form.validate(async valid => {
        if (valid) {
          let res = await this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: this.form
          });
          if (res.status === 200) {
            this.$message.success("注册成功");
            this.$store.commit("user/SetUserInfo", res.data);
            setTimeout(() => {
              this.$router.push("/");
            }, 2000);
          }
        } else {
          this.$message.error("请输入正确的用户名手机和密码");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>