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
        @on-edit="showEditForm1"
      />
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card> 
    <user-form-dialog ref="dialog" @on-success-valid="save"></user-form-dialog>
  </div>
</template>

<script>
import Tables from "_c/tables";
import UserFormDialog from "_c/sys/user-form-dialog";
import UserForm from "_c/sys/user-form";
import { getUserData, postUserData } from "@/api/sys";
import { setTimeout } from 'timers';
export default {
  name: "user_manage_page",
  components: {
    Tables,
    UserForm,
    UserFormDialog
  },
  data() {
    return {
      showDialog: false,
      msg: '',
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
  methods: {
    save(data){
        setTimeout(()=>{
          console.log(data)
          this.$refs.dialog.show = false 
        },2000)
    },
    handleDelete(params) {
      console.log(params);
    },
    showEditForm1(params) { 
       this.$refs.dialog.show = true 
       this.$refs.dialog.title = '修改用户信息'
      // this.userModel.user.userCode = params.row.userCode;
      // this.userModel.user.userName = params.row.userName;
      // this.userModel.showDialog = true;
      //this.$refs.dialog.show = true
    },
    handleSubmit(user) {
      console.log(user);
    },
    showEditForm(params) {
      let user = {
        id: params.row.id,
        userCode: params.row.userCode,
        userName: params.row.userName
      }; 
      this.$Modal.confirm({
        title: "修改用户信息",
        render: h => {
          return h(UserForm, {
            //在此处使用引入的组件
            ref: "dialog",
            props: {
              user: user,
              state: 4
            }
          }); 
        },
        width: 600,
        closable: false,
        okText: "确定",
        cancelText: "取消",
        loading: true,
        onOk() {   
          this.$refs.dialog.$refs.userForm.validate(valid => {
            console.log(this.$Modal)
            if (valid) {
              postUserData(user).then(res => {
                this.$Message.info(
                  "修改成功:" +
                    JSON.stringify(user) +
                    " res:" +
                    JSON.stringify(res)
                );
                params.row.userCode = user.userCode;
                params.row.userName = user.userName;
                //  this.$Modal.remove();
              });
            }
          });
        }
      });
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

