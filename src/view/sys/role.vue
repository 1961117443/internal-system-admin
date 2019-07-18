<template>
  <div>
    <!-- 角色窗体 -->
    <Card>
      <p slot="title">
        <Icon type="md-person"></Icon>编辑角色
      </p>
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        :label-width="100"
        clearable
        inline
        :key="form.id"
        @on-clear="handleClear"
      >
        <FormItem label="角色名称" prop="name">
          <Input v-model="form.name" placeholder="输入角色名称"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('form')">{{buttonTitle}}</Button>
          <Button @click="handleReset('form')" style="margin-left: 8px">清空</Button>
        </FormItem>
      </Form>
    </Card>
    <Divider />
    <!-- 角色列表 -->
    <Card>
      <tables
        ref="tables"
        editable
        searchable
        search-place="top"
        v-model="tableData"
        :columns="columns"
        @on-delete="handleDelete"
        @on-edit="handleEdit"
        @on-save-edit="handleSave"
        @on-allot-auth="handleAllotAuth"
      />
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
    <!--设置左侧弹出框-->
    <drag-drawer
      v-model="showAllot"
      :width.sync="width2"
      min-width="300px"
      :inner="true"
      :transfer="false"
      placement="left"
      :draggable="draggable"
      @on-resize="handleResize"
      class-name="content-wrapper"
      :scrollable="true"
      :mask-closable="false"
    >
      <div slot="header">
        <Icon type="md-aperture" :size="18"></Icon>
        <b>分配权限</b>
      </div>
      <!-- 分配权限组件，传入当前的角色id -->
      <allot-auth roleId="abc1" @on-success="handleAllotSubmit"></allot-auth>
      <!-- <div slot="footer"> 
        <router-view></router-view>
      </div> -->
    </drag-drawer>
  </div>
</template>

<script>
import Tables from "_c/tables";
import DragDrawer from "_c/drag-drawer";
import AllotAuth from "_c/role/allot-auth.vue";
import { getRoleData, postRoleData } from "@/api/sys";
export default {
  name: "role_manage_page",
  components: {
    Tables,
    AllotAuth,
    DragDrawer
  },
  data() {
    return {
      showAllot: false,
      width2: 500,
      placement: true,
      draggable: true,
      ruleValidate: {
        name: [
          { required: true, message: "角色名称不能为空！", trigger: "blur" }
        ]
      },
      form: {
        id: "",
        name: ""
      },
      h: 500,
      columns: [
        // { title: 'Id', key: 'id', sortable: true },
        { title: "角色名称", key: "name", editable: true },
        { title: "创建时间", key: "createTime" },
        {
          title: "操作",
          key: "handle",
          options: ["delete", "edit"],
          button: [
            (h, params, vm) => {
              let allot = h(
                "Button",
                {
                  props: {
                    type: "text",
                    ghost: true,
                    disabled: !this.canEdit
                  },
                  on: {
                    click: () => {
                      vm.$emit("on-allot-auth", params);
                    }
                  }
                },
                [
                  h("Icon", {
                    props: {
                      type: "md-contact",
                      size: 18,
                      color: "#000000"
                    }
                  })
                ]
              );
              if (this.canEdit) {
                return allot;
              }
            }
          ]
        }
      ],
      tableData: []
    };
  },
  methods: {
    handleResize(event) {
      const { atMin } = event;
      /* eslint-disable */
      console.log(atMin);
    },
    handleClear() {
      this.form = {
        id: "",
        name: ""
      };
    },
    handleDelete(params) {
      console.log(params);
    },
    handleEdit(params) {
      this.form = Object.assign(this.form, params.row);
    },
    handleSave(params) {
      if (!(params.row[params.column.key] === params.value)) {
        let data = {
          id: params.row.id,
          name: params.value
        };
        console.log(data);
      }
    },
    /**
     * 保存角色
     */
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          postRoleData(this.form).then(res => {
            if (this.form.initRowIndex > -1) {
              let row = this.tableData[this.form.initRowIndex];
              Object.assign(row, this.form);
            } else {
              res.data.name = this.form.name;
              this.tableData.push(res.data);
            }
            this.$Message.success("保存成功!");
            this.handleClear();
          });
        }
      });
    },
    /**
     * 重置角色窗体字段
     * */

    handleReset(name) {
      this.handleClear();
      //this.$refs[name].resetFields();
    },
    /**
     * 分配权限
     */
    handleAllotAuth(params) {
      this.showAllot = true;
      console.log(params);
    },
    /**
     * 保存分配的权限
     */
    handleAllotSubmit(params){
      this.showAllot = false;
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      });
    }
  },
  computed: {
    placementComputed() {
      return this.placement ? "left" : "right";
    },
    canEdit() {
      return true;
    },
    buttonTitle() {
      if (this.form.id && this.form.id.length === 0) {
        return "新增";
      } else {
        return "修改";
      }
    }
  },
  mounted() {
    getRoleData().then(res => {
      this.tableData = res.data;
    });
  },
  created() {
    this.h = document.documentElement.clientHeight - 300;
  }
};
</script>

<style lang="less">
.content-wrapper {
  position: relative;
}
</style>
