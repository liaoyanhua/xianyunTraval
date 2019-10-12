<template>
  <div class="container">
    <el-carousel :interval="2000" arrow="always">
      <el-carousel-item v-for="(item,index) in bgImgs" :key="index">
        <div
          class="banner-image"
          :style="`background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat;background-size:contain contain`"
        ></div>
      </el-carousel-item>
    </el-carousel>

    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <el-row type="flex" class="search-tab">
          <span :class="{'active':current===index}"
          v-for="(item,index) in searchNav" 
          :key="index"
          @click="handleSearch(index)">
            <i>{{item.title}}</i>
          </span>
        </el-row>

        <!-- 输入框 -->
        <el-row type="flex" align="middle" class="search-input">
          <input :placeholder="searchNav[current].content" />
          <i class="el-icon-search"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgImgs: [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571404638&di=688d6f3abd3c61abcdd63a596351ff9f&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0386d2355deac6e00000159950515e2.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570809925337&di=62e8a76d976cf3faf5fdeeafb0b20cc0&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F038bb1e576134a50000018c1bacd997.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570809925327&di=1f871e2dd2ca924bd8cee629174d98e1&imgtype=0&src=http%3A%2F%2Fimg.51miz.com%2FElement%2F00%2F59%2F08%2F41%2Fabf2ee59_E590841_4a2c71eh.jpg%2521%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue%2Fformat%2Fjpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570809925321&di=2cb6f14e8a953acc2ca494abf8245c70&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F03877c458bbadb5a801219c775488f6.jpg"
      ],
      current:0,
      searchNav:[
        {title:'攻略',content:'搜索城市'},
        {title:'酒店',content:'请输入附近的酒店名称或者城市'},
        {title:'机票',content:''}
      ]
    };
  },
  methods:{
    handleSearch(index){
      this.current=index;
      if(index===2){
        this.$router.push('/air');
      }
    }
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      this.bgImgs = res.data.data;
    });
   
  }
};
</script>

<style scoped lang="less">
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }

  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }

      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;

        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: "";
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }

    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>