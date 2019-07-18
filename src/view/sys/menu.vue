<template>
  <div> 
    <!-- 菜单列表 -->
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
      />
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
    <!--设置右边弹出框-->
    <drag-drawer
      v-model="showDrawer"
      :width.sync="drawerWidth"
      min-width="300px"
      :inner="true"
      :transfer="false"
      placement="right"
      :draggable="draggable"
      class-name="content-wrapper"
      :scrollable="true"
      :mask-closable="false"
    >
      <div slot="header">
        <h2>菜单信息</h2>
      </div>
      <!-- 菜单窗体 -->
      <Form
        ref="form"
        :model="form"
        :rules="ruleValidate"
        :label-width="100"
        clearable
        :key="form.id"
        @on-clear="handleClear"
      >
        <FormItem label="菜单名称" prop="name">
          <Input v-model="form.name" placeholder="输入菜单名称"></Input>
        </FormItem>
        <FormItem label="接口地址" prop="url">
          <Input v-model="form.name" placeholder="输入接口地址"></Input>
        </FormItem>
        <FormItem label="请求方式" prop="httpMethod">
          <Select v-model="form.httpMethod">
            <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
            <Option value="get" key="get">get</Option>
            <Option value="post" key="post">post</Option>
            <Option value="delete" key="delete">delete</Option>
            <Option value="put" key="put">put</Option>

          </Select>
        </FormItem>
      </Form>
      <div class="form-drawer-footer" slot="footer">
        <Button @click="handleReset('form')" style="margin-right: 8px">清空</Button>
        <Button v-if="isAdd" type="primary" @click="handleSubmit('form')">新增</Button>
        <Button v-else type="primary" @click="handleSubmit('form')">保存</Button>
      </div>
    </drag-drawer>
  </div>
</template>

<script>
import Tables from "_c/tables";
import DragDrawer from "_c/drag-drawer";
import { getMenuData, postMenuData } from "@/api/sys";
export default {
  name: "menu_manage_page",
  components: {
    Tables,
    DragDrawer
  },
  data() {
    return {
      showDrawer: false,
      drawerWidth: 500,
      draggable: false,
      ruleValidate: {
        name: [
          { required: true, message: "菜单名称不能为空！", trigger: "blur" }
        ]
      },
      roleId: "",
      form: {
        id: "",
        name: ""
      },
      h: 500,
      columns: [
        // { title: 'Id', key: 'id', sortable: true },
        { title: "菜单名称", key: "name" },
        { title: "接口地址", key: "url" },
        { title: "请求方式", key: "httpMethod",width:100 },
        { title: "创建时间", key: "createTime" },
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
      this.showDrawer = true;
    },
    /**
     * 保存
     */
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          postMenuData(this.form).then(res => {
            if (this.form.initRowIndex > -1) {
              let row = this.tableData[this.form.initRowIndex];
              Object.assign(row, this.form);
              console.log(row)
            } else {
              res.data.name = this.form.name;
              this.tableData.push(res.data);
            }
            this.$Message.success("保存成功!");
            this.handleClear();
            this.showDrawer = false
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
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${new Date().valueOf()}.csv`
      });
    },
    getData(){
        getMenuData().then(res => {
            this.tableData = res.data;
            });
    }
  },
  computed: {
    isAdd() {
      console.log(this.form.id);
      if (this.form.id == "") {
        return true;
      }

      return false;
    }
  },
  mounted() {
    this.getData()
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

.form-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
