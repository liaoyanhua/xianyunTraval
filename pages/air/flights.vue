<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters
          :filters="cacheFlightsData"
          @setFlightsData="setFlightsData"
          @setFlightslist="setFlightslist"
        />

        <!-- 航班头部布局 -->
        <FlightsHead />

        <!-- 航班信息 -->
        <FlightsItem :key="index" :item="item" v-for="(item,index) in flightsList" />

        <!-- 当无数据时显示暂无数据 -->
        <el-row
          v-if="flightsData.flights.length===0 && !loading"
          style="padding:50px;text-align:center"
        >该航班暂无数据</el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <FlightsAside />
    </el-row>
  </section>
</template>

<script>
import FlightsHead from "@/components/air/FlightsListHead";
import FlightsItem from "@/components/air/FlightsItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";

export default {
  components: {
    FlightsHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
      total: 0,
      pageIndex: 1,
      pageSize: 5,
      flightsData: {
        //获取全部的航班数据
        //给这个航班数据初始一个空值，因为一开始数据需要请求需要时间，不定义一个空的话会报错
        flights: [],
        info: {},
        options: {}
      },
      //定义一个不变的航班数据
      cacheFlightsData: {
        flights: [],
        info: {},
        options: {}
      },
      loading: true
    };
  },
  computed: {
    flightsList() {
      //分页截取后的
      let data = this.flightsData.flights.slice(
        (this.pageIndex - 1) * 5,
        this.pageSize * this.pageIndex
      );
      return data;
    }
  },
  methods: {
    //获取每页条数
    handleSizeChange(val) {
      this.pageSize = val;
    },
    //拿到当前页
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    //定义一个飞机类型筛选事件
    setFlightsData(arr) {
      this.flightsData.flights = arr; //拿到当前筛选出来的数组赋值给原来需要渲染数据的航班数组数据
      this.total = arr.length; //航班数据发生变化后此时总条数也会变故此时应该将总条数赋值给当前的数组的长度
      this.pageIndex = 1; //并且让用户每次筛选之后都在第一页的起始位置
    },
    //定义一个撤销筛选条件事件
    setFlightslist(arr) {
      this.flightsData.flights = arr; //在航班过滤组件这边传过来的撤销后的数据赋值给当前的这个航班数据
      this.total = arr.length; //航班数据发生变化后此时总条数也会变故此时应该将总条数赋值给当前的数组的长度
      this.pageIndex = 1; //并且让用户点了撤销之后都在第一页的起始位
    },
    //获取飞机列表数据
    getlist() {
      let flightsMsg = this.$route.query;
      this.$axios({
        url: "/airs",
        params: flightsMsg
      }).then(res => {
        this.flightsData = res.data;
        this.cacheFlightsData = { ...res.data };
        this.total = res.data.total;
        this.loading = false;
      });
    }
  },
  //监听路由变化,实时实现数据更新
  watch: {
    $route() {
      this.getlist();
    }
  },
  mounted() {
    this.getlist();
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>