<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          @blur="handleCity('depart')"
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          v-model="form.departCity"
          @select="handleDepartSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          @blur="handleCity('dest')"
          :fetch-suggestions="queryDestSearch"
          v-model="form.destCity"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          v-model="form.departDate"
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      //飞机票tab栏切换
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      //提交给机票列表查询的数据
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      searchCities: []
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      this.currentTab = index;
      if (index === 1) {
        this.$alert("暂时还不支持往返机票查询！", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
    },
    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryDepartSearch(value, cb, name) {
      //   cb([{ value: 1 }, { value: 2 }, { value: 3 }]);
      if (!this.form[(name ? name : "depart") + "City"]) return;
      let res = await this.$axios({
        url: "/airs/city",
        params: { name: this.form[(name ? name : "depart") + "City"] }
      });
      this.searchCities = res.data.data.map(v => {
        v.value = v.name;
        return v;
      });
      cb(this.searchCities);
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    async queryDestSearch(value, cb) {
      //   cb([{ value: 1 }, { value: 2 }, { value: 3 }]);
      this.queryDepartSearch(value, cb, "dest");
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item, name) {
      this.form[(name ? name : "depart") + "City"] = item.name;
      this.form[(name ? name : "depart") + "Code"] = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.handleDepartSelect(item, "dest");
    },
    //失去焦点时给输入框form一个默认值
    handleCity(name) {
      if (!this.form[name + "City"]) return;
      this.form[name + "City"] = this.searchCities[0].value;
      this.form[name + "Code"] = this.searchCities[0].sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      console.log(value);
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      let obj = {
        departCity: this.form.destCity,
        departCode: this.form.destCode,
        destCity: this.form.departCity,
        destCode: this.form.departCode
      };
      this.form = { ...this.form, ...obj };
    },

    // 提交表单是触发
    handleSubmit() {
      // console.log(this.form);
      let rules = {
        departCity: {
          errorMessage: "请输入正确的出发城市",
          value: this.form.departCity
        },
        destCity: {
          errorMessage: "请输入正确的到达城市",
          value: this.form.destCity
        },
        departDate: {
          errorMessage: "请选择正确的出发日期",
          value: this.form.departDate
        }
      };
      let objName = Object.keys(rules); //拿到rules里面的属性名，获取到的结果是：['departCity','destCity','departDate']
      let flag = true;
      objName.forEach(v => {
         if(!flag)return;
        if (!rules[v].value) {
          this.$message.error(rules[v].errorMessage);
          flag = false;
        }
      });
      if(!flag)return;
      this.$router.push({
        path:'/air/flights',
        query:this.form
      })
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
