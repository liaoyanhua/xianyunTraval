<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 8, message: "长度在 5 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
        this.$refs.form.validate(valid=> {
          if (!valid) {
            this.$message.error('请输入正确的用户名或秘密');
          } else {
            //在vuex中  使用mutations同步存储数据的方式
          //  this.$axios({
          //       url:'/accounts/login',
          //       method:'POST',
          //       data:this.form
          //   }).then(res=>{
          //       if(res.status===200){
          //           this.$message.success('登录成功');
          //           //在vuex中存储数据
          //           this.$store.commit("user/SetUserInfo",res.data);
          //           this.$router.push('/');
          //       }
          //   })

          //在vuex中使用actions异步存储数据的方式
            this.$store.dispatch('user/login',this.form).then(res=>{
              console.log(res);
              if(!res.token)return;
              this.$message.success('登陆成功');
              setTimeout(()=>{
                this.$router.push('/')
              },2000)
            })

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
