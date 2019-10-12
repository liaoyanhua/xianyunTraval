<template>
  <div class="container">
    <!-- 轮播图组件完成 -->
    <el-carousel :interval="2000" arrow="always">
      <el-carousel-item v-for="(item,index) in bgImgs" :key="index">
        <div
          class="banner-image"
          :style="`background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat;background-size:contain contain`"
        ></div>
      </el-carousel-item>
    </el-carousel>
    <!-- tab栏切换完成 -->
    <el-row type="flex" justify="center" align="middle" class="main">
      <div class="form-wrapper">
        <!-- 表单头部tab -->
        <el-row type="flex" justify="center" class="tabs">
          <span
            :class="{active: currentTab === index}"
            v-for="(item, index) in [`登录`, `注册`]"
            :key="index"
            @click="handleChangeTab(index)"
          >{{item}}</span>
        </el-row>

        <!-- 登录功能组件 -->
        <LoginForm v-if="currentTab == 0" />

        <!-- 注册功能组件 -->
        <!-- <RegisterForm v-if="currentTab == 1"/> -->
      </div>
    </el-row>
  </div>
</template>

<script>
import LoginForm from "@/components/user/LoginForm";
export default {
  components: {
    LoginForm
  },
  data() {
    return {
      currentTab: 0,
      bgImgs: []
    };
  },
  async mounted() {
      //获取轮播图数据
    let res = await this.$axios({
      url: "/scenics/banners"
    });
    this.bgImgs = res.data.data;
  },
  methods: {
    //实现登录注册tab栏切换
    handleChangeTab(index) {
      this.currentTab = index;
    }
  }
};
</script>

<style scoped lang="less">
.container {
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
  height: 700px;
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    position: absolute;
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }

  .main {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    top: -5%;

    .form-wrapper {
      width: 400px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;

      .tabs {
        span {
          display: block;
          width: 50%;
          height: 50px;
          box-sizing: border-box;
          border-top: 2px #eee solid;
          background: #eee;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
          color: #666;

          &.active {
            color: orange;
            border-top-color: orange;
            background: #fff;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
