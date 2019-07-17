<template>
  <div>
    <Card>
      <tables
        ref="tables"
        editable
        searchable
        search-place="top"
        v-model="tableData"
        :columns="columns"
        @on-delete="handleDelete"
        @on-edit="handleUserEdit"
      />
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
    <!--编辑对话框-->
    <Modal
      ref="userDialog"
      v-model="showDialog"
      :title="title"
      :loading="true"
      :mask-closable="false"
    >
      <div slot="header" style="fontSize:18px;fontWeight:bold">
        <span>{{title}}</span>
      </div>
      <Form ref="userForm" :model="user" label-position="right" :label-width="100">
        <FormItem label="用户账号" prop="userCode">
          <Input v-model="user.userCode" :disabled="EditState || BrowseState" placeholder="请输入用户账号">
            <span slot="prepend">
              <Icon :size="16" type="ios-person"></Icon>
            </span>
          </Input>
        </FormItem>
        <FormItem label="用户名称" prop="userName">
          <Input v-model="user.userName" :disabled="BrowseState" placeholder="请输入用户名称">
            <span slot="prepend">
              <Icon :size="16" type="ios-person"></Icon>
            </span>
          </Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <!-- <Button size="large" @click="cancleSubmit(user)">取消</Button> -->
        <!-- <Button type="primary" size="large" @click="handleSubmit">确定</Button> -->
        <Button type="primary" :loading="isAjaxing" @click="handleSubmit">
          <span v-if="!isAjaxing">确定</span>
          <span v-else>确定</span>
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Tables from "_c/tables";
import { getUserData, postUserData } from "@/api/sys";
import { setTimeout } from "timers";
import { BillState } from "@/data";
export default {
  name: "user_manage_page",
  components: {
    Tables
  },
  data() {
    return {
      showDialog: false,
      isAjaxing : false,
      // title: "用户信息",
      dataState: 1,
      //当前编辑的用户
      user: {},
      columns: [
        { title: "用户账号", key: "userCode" },
        { title: "用户名称", key: "userName" },
        {
          title: "停用",
          key: "isDisable",
          render: (h, p) => {
            let c = h(
              "i-switch",
              {
                props: {
                  value: p.row.isDisable,
                  size: "large"
                },
                on: {
                  "on-change": val => {
                    if (!val) {
                      this.$Modal.confirm({
                        title: "是否禁用当前用户",
                        onOk: () => {
                          console.log(c);
                        }
                      });
                    }
                  }
                }
              },
              [
                h("span", {
                  slot: "open",
                  domProps: { innerHTML: "ON" }
                }),
                h("span", {
                  slot: "close",
                  domProps: { innerHTML: "OFF" }
                })
              ]
            );
            return c;
          }
        },
        // { title: 'Create-Time', key: 'createTime' },
        {
          title: "操作",
          key: "handle",
          options: ["delete", "edit"]
        }
      ],
      tableData: []
    };
  },
  computed: {
    EditState() {
      return BillState.IsEdit(this.dataState);
    },
    BrowseState() {
      return BillState.IsBrowse(this.dataState);
    },
    title: function() {
      if (BillState.IsInsert(this.dataState)) {
        return "添加用户";
      } else if (BillState.IsEdit(this.dataState)) {
        return "修改用户信息";
      } else {
        return "用户信息";
      }
    }
  },
  methods: {
    handleUserEdit(params) {
      console.log(this.$layer.alert("找不到对象！"))
      this.$layer.alert("找不到对象！");
      this.user = Object.assign(this.user, params.row);
      this.user.__row = params.row;
      this.dataState = BillState.edit;
      //this.showDialog = true;
    },
    handleDelete(params) {
      console.log(params);
    },
    handleSubmit() {
      this.$layer.alert("找不到对象！");
      this.isAjaxing = true
      let row = this.user.__row;
      if (row) {
        delete this.user.__row;
      }
      this.$layer.confirm('您是如何看待前端开发？', {
  btn: ['重要','奇葩'] //按钮
}, function(){
  layer.msg('的确很重要', {icon: 1});
}, function(){
  layer.msg('也可以这样', {
    time: 20000, //20s后自动关闭
    btn: ['明白了', '知道了']
  });
});
      console.log(this.$layer)
      //加载层 
      var index = this.$layer.loading(1, {shade: false}); //0代表加载的风格，支持0-2
      postUserData(this.user).then(res => {
        console.log(res);
        this.$Message.info("ok");
        Object.assign(row, this.user);
        this.showDialog = false;
        this.dataState = BillState.browse; 
        this.$layer.close(index)
      }).finally(()=>this.isAjaxing = false);
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      });
    }
  },
  mounted() {
    getUserData().then(res => {
      this.tableData = res.data;
    });
  }
};
</script>

<style>
</style>

