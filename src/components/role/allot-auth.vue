<template>
  <div>
    <Button type="primary" @click="handleSubmit('roleTree')">保存</Button>
    <Divider />
    <Tree ref="roleTree" :data="data" show-checkbox multiple></Tree>
  </div>
</template>

<script>
import { getRoleAuthData } from "@/api/sys";
export default {
  data() {
    return {
      data: []
    };
  },
  props: {
    roleId: {
      type: String,
      default: ""
    }
  },
  beforeCreate(){
    console.log("beforeCreate")
  },created(){
    console.log("Create")
  },
  beforeMounted() {
    console.log("beforeMounted") 
  },
  beforeUpdate() {
    console.log("beforeUpdate") 
  },
  updated(){
    console.log("updated") 
  },
  mounted() {
    console.log("mounted")
    this.getRoleAuth();
  },
  watch:{
    roleId(val){
      console.log(val)
    }
  },
  methods: {
      handleSubmit(name){ 
        let data =this.$refs[name].getCheckedAndIndeterminateNodes() 
        console.log(data)
          this.$emit('on-success',data)
      },
    getRoleAuth() {
      this.data = 
      [
    { 
        "title": "权限管理",
        "expand": true,
        "selected": true,
        "children": [
            { 
                "title": "角色管理",
                "children": [
                    {
                        "title": "新增"
                    },
                    {
                        "title": "修改"
                    },
                    {
                        "id": 1,
                        "title": "删除"
                    },
                    {
                        "title": "分配权限"
                    }
                ]
            },
            {
                "title": "用户管理",
                "children": [
                    {
                        "title": "leaf 1-2-1",
                        "checked": true
                    },
                    {
                        "title": "leaf 1-2-1"
                    }
                ]
            },
            {
                "title": "菜单管理",
                "children": [
                    {
                        "title": "leaf 1-2-1",
                        "checked": true
                    },
                    {
                        "title": "leaf 1-2-1"
                    }
                ]
            }
        ]
    }
]
      //   getRoleAuthData({ id: this.roleId }).then(res => {
      //     console.log(res);
      //   });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>