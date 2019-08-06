<template>
  <div ref="demandlist">
    <!-- 需求列表 -->
    <Card> 
      <Table ref="tables" editable searchable search-place="top" highlight-row
      :data="list" v-model="list" :columns="columns" :loading="loading">
        <template slot-scope="{ row }" slot="action">
          <Button
            type="primary"
            size="small"
            style="margin-right: 2px"
            @click="getDemand(row.id)"
          >查看</Button>
          <Button ghost
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="getDemand(row.id)"
          >审核</Button>
          <!-- <Button type="error" size="small" @click="getDemand(index)">Delete</Button> -->
        </template> 
      </Table>
      <br>
      <!-- <Divider size="small"/> -->
      <Page ref="page" :total="totalCount" :page-size="20"
      @on-change="getDemandList()" 
      @on-page-size-change="getDemandList()" show-sizer  show-total/>
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
    <!-- <h1>需求列表</h1>
    <li v-for="item in list" @click="getDemand(item.id)" :key="item.id">
      <Button size="large">{{item.billCode}}</Button>
    </li>-->
  </div> 
</template>
<script>
import Tables from "_c/tables";
import { getList } from "@/api/demand";
import DemandInput from "@/view/demand/input.vue";
export default {
  components: {
    DemandInput,
    Tables
  },
  data() {
    return {
      loading:false,
      totalCount:0,
      list: [],
      columns: [
        { title: "需求编号", key: "billCode" },
        { title: "录入日期", key: "inputDate" },
        { title: "理论交期", key: "theoryDate" },
        { title: "计划完成日期", key: "plannedCompletionDate" },
        { title: "提出日期", key: "suggestDate" },
        { title: "客户名称", key: "customerName" },
        { title: "优先级", key: "priority" },
        { title: "客户状态", key: "clientRelationship" },
        { title: "实施/客服", key: "implement" },
        { title: "需求提出者", key: "demander" },
        { title: "手机", key: "telephone" },
        { title: "所属模块", key: "moduleName" },
        { title: "操作", slot: "action",   width: 150  }
      ], 
    };
  },
  mounted() {
    this.getDemandList();
  },
  methods: { 
    getDemandList() {  
      let data ={
        pageIndex:this.$refs["page"].currentPage,
        pageSize:this.$refs["page"].currentPageSize
      }
      this.loading = true
      getList(data).then(res => { 
        this.totalCount = res.data.total
        this.list = res.data.data
      }).finally(()=> this.loading=false);
    },
    getDemand(id) {
      let _this = this;
      console.log(this.$refs["demandlist"].offsetWidth);
      let instance = this.$Modal.info({
        width: this.$refs["demandlist"].offsetWidth,
        okText: "关闭",
        render: h => {
          return h(DemandInput, {
            props: {
              id: id
            },
            on: {
              "on-success": function(param) {
                console.log(JSON.stringify(param));
                _this.$Modal.remove();
              }
            }
          });
        }
      });
      //   this.$router.push({
      //       name: 'demand_input_page',
      //     path: "/demand/input",
      //     //不会把参数放在url上面
      //     params: {
      //       id: id
      //     }
      //会把参数放在url上面
      // query: {
      //   id: id
      // }
      //   });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>