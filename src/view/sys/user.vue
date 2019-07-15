<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
      @on-delete="handleDelete"
      @on-edit="showEditForm" />
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>

    <Modal
        v-model="form.__editing"
        :title="form.__title"
        @on-ok="saveUser" >
        <Form
      ref="userFormDialog"
      label-position="right"
       :label-width="80"
    >
      <user-form :user="form" v-model="form" ></user-form>
      <!-- <FormItem prop="code"  label="用户账号">
        <Input v-model="form.code" placeholder="请输入用户账号"></Input>
      </FormItem>
      <FormItem prop="name" label="用户名称">
        <Input v-model="form.name" placeholder="请输入用户名">
          <span slot="prepend">
            <Icon :size="16" type="ios-person"></Icon>
          </span>
        </Input>
      </FormItem> -->
    </Form>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import UserForm from '_c/sys/user-form'
import { getUserData, postUserData } from '@/api/sys'
export default {
  name: 'user_manage_page',
  components: {
    Tables,
    UserForm

  },
  data () {
    return {
      form: {
        __title: '',
        __editing: false
      },
      modal1: false,
      columns: [
        { title: '用户账号', key: 'userCode' },
        { title: '用户名称', key: 'userName' },
        { title: '停用',
          key: 'isDisable',
          render: (h, p) => {
            let c = h('i-switch', {
              props: {
                value: p.row.isDisable,
                size: 'large'
              },
              on: {
                'on-change': (val) => {
                  if (!val) {
                    this.$Modal.confirm({
                      title: '是否禁用当前用户',
                      onOk: () => {
                        console.log(c)
                      }
                    })
                  }
                }
              }
            }, [h('span', {
              slot: 'open', domProps: { innerHTML: 'ON' }
            }), h('span', {
              slot: 'close', domProps: { innerHTML: 'OFF' }
            })])
            return c
          }
        },
        // { title: 'Create-Time', key: 'createTime' },
        {
          title: '操作',
          key: 'handle',
          options: ['delete', 'edit']
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    saveUser () {
      postUserData(this.form).then(res => {
        console.log(res)
        this.form.__data.userCode = this.form.userCode
        this.form.__data.userName = this.form.userName
      })
    },
    showEditForm (params) { 
      console.log(this.$refs.userFormDialog)
      //this.form = Object.assign(this.form, params.row)
      this.form.userCode = params.row.userCode
      this.form.userName = params.row.userName
      this.form.__title = '修改用户信息'
      this.form.__editing = true
      this.form.__data = params.row

      console.log(this.$refs.userFormDialog)
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
