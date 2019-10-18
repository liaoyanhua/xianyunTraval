<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{filters.info.departCity}} - {{filters.info.destCity }}
                / 
                {{filters.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option :key="index" v-for="(item,index) in filters.options.airport"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option :key="index" v-for="(item,index) in filters.options.flightTimes"
                    :label="`${item.from<10?('0'+item.from):item.from}:00 - ${item.to<10?('0'+item.to):item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option :key="index" v-for="(item,index) in filters.options.company"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option :key="index" v-for="(item,index) in airportSize"
                    :label="item.name"
                    :value="item.size">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        filters:{
            type:Object,
             // 默认是空数组
            default:{}
        }
    },
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小
            airportSize:[       //飞机大小选择
                {name:'大',size:'L'},
                {name:'中',size:'M'},
                {name:'小',size:'S'}
            ]    
        }
    },
    mounted(){
        let obj={...this.filters}
        console.log(obj);
    },
    methods: {
        // 选择机场时候触发
        handleAirport(value){
            let flightsArr=this.filters.flights.filter(v=>{
                //循环传过来的航班数据的每一项，并判断当前其飞机场是否和用户选的一样
                return v.org_airport_name===value;
            });
            this.$emit('setFlightsData',flightsArr)
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
            let start= +value.split(',')[0];
            let end= +value.split(',')[1];
             let flightsArr=this.filters.flights.filter(v=>{
                //循环传过来的航班数据的每一项，并判断当前其飞机场是否和用户选的一样
               let startTime= +v.dep_time.split(':')[0];
               return startTime>=start &&startTime<end;
            });
            this.$emit('setFlightsData',flightsArr)
        },

         // 选择航空公司时候触发
        handleCompany(value){
            let flightsArr=this.filters.flights.filter(v=>{
                //循环传过来的航班数据的每一项，并判断当前其飞机场是否和用户选的一样
                return v.airline_name===value;
            });
            this.$emit('setFlightsData',flightsArr)
        },

         // 选择机型时候触发
        handleAirSize(value){
           let flightsArr=this.filters.flights.filter(v=>{
                //循环传过来的航班数据的每一项，并判断当前其飞机场是否和用户选的一样
                return v.plane_size===value;
            });
            this.$emit('setFlightsData',flightsArr)
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
             this.airport=""        
            this.flightTimes="" 
            this.company=""      
            this.airSize=""
            this.$emit('setFlightslist',this.filters.flights)
        },
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>