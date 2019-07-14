<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" 
      @on-delete="handleDelete"
      @on-edit="showEditForm" />
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
    <Modal
        v-model="modal1"
        title="用户信息" 
        @on-ok="ok">
        <Form ref="formValidate" :model="formValidate" :label-width="80">
        <FormItem label="用户账号" prop="code">
            <Input v-model="formValidate.code"></Input>
        </FormItem> 
        <FormItem label="用户名称" prop="name">
            <Input v-model="formValidate.name" placeholder="输入姓名"></Input>
        </FormItem>  
        <FormItem>
            <!-- <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button> -->
        </FormItem> 
        </Form>
    </Modal>  

    <template id="editform">

    </template>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getUserData } from '@/api/sys' 
export default {
  name: 'user_manage_page',
  components: {
    Tables
  },
  data () {
    return { 
      formValidate:{
        name:''
      },
      modal1:false,
      columns: [
        { title: '用户账号', key: 'code' },
        { title: '用户名称', key: 'name' },
        { title: '是否停用', key: 'isDisable' },
        // { title: 'Create-Time', key: 'createTime' },
        {
          title: '操作',
          key: 'handle',
          options: ['delete','edit'] 
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    }, 
    ok(){
      console.log(this.formValidate)
    },
    showEditForm(params){  
      this.formValidate = Object.assign({},params.row)
      this.modal1 = true   
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    getUserData().then(res => {
      this.tableData = res.data
    })
  } 
}
</script>

<style> 
</style>
