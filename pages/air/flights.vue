<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :filters="flightsInfo"/>

        <!-- 航班头部布局 -->
        <FlightsHead/>

        <!-- 航班信息 -->
        <FlightsItem :key="index" :item="item" v-for="(item,index) in flightsList" />

          <!-- 当无数据时显示暂无数据 -->
        <el-row v-if="flightsData.length===0 && !loading" style="padding:50px;text-align:center">
            该航班暂无数据
        </el-row>
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
     <FlightsAside/>
    </el-row>
  </section>
</template>

<script>
import FlightsHead from "@/components/air/FlightsListHead";
import FlightsItem from "@/components/air/FlightsItem";
import FlightsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside"

export default {
  components: {
    FlightsHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
        total:0,
        pageIndex:1,
        pageSize:5,
      flightsData: [],//获取全部的
      loading:true,
      flightsInfo:{}
    };
  },
    computed:{
        flightsList(){//分页截取后的
            let data=this.flightsData.slice((this.pageIndex-1)*5,this.pageSize*this.pageIndex);
            return data;
        }
    },
  methods: {
    //获取每页条数
    handleSizeChange(val) {
         this.pageSize=val;
    },
    //拿到当前页
    handleCurrentChange(val) {
         this.pageIndex=val;
    }
  },
  async mounted() {
      console.log(this.loading)
    let flightsMsg = this.$route.query;
    let res = await this.$axios({
      url: "/airs",
      params: flightsMsg
    });
    this.flightsData = res.data.flights;
    this.total=res.data.total;
    this.loading=false;
    //渲染航班信息表
    this.flightsInfo=res.data.info;
      console.log( this.flightsInfo)
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