<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" 
      @on-delete="handleDelete"
      @on-save-edit="handleSave"/>
      <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getRoleData } from '@/api/sys'
export default {
  name: 'role_manage_page',
  components: {
    Tables
  },
  data () {
    return {
      h: 500,
      columns: [
        // { title: 'Id', key: 'id', sortable: true },
        { title: '角色名称', key: 'name', editable: true },
        // { title: 'Create-Time', key: 'createTime' },
        {
          title: '操作',
          key: 'handle',
          options: ['delete']
          // button: [
          //   (h, params, vm) => {
          //     return h('Poptip', { 
          //       props: {
          //         confirm: true,
          //         title: 'Button你确定要删除吗?',
          //         transfer: true
          //       },
          //       on: {
          //         'on-ok': () => {
          //           vm.$emit('on-delete', params)
          //           vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
          //         }
          //       }
          //     }, [
          //       h('Button',{
          //         props: {
          //             type: 'error',
          //             size: 'small'
          //         },
          //         style: {
          //             marginRight: '5px'
          //         },
          //       }, '删除')
          //     ])
          //   }
          // ]
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    }, 
    handleSave(params){  
      if(!(params.row[params.column.key]===params.value)){  
        let data= {
          id:params.row.id,
          name:params.value
        }
        console.log(data)
      } 
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    getRoleData().then(res => {
      this.tableData = res.data
    })
  },
  created () {
    this.h = document.documentElement.clientHeight - 300 
  }
}
</script>

<style> 
</style>
