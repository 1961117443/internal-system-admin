<template>
  <div>
    <Button type="primary" @click="handleSubmit('roleTree')">保存</Button>
    <Divider size="small" />
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
  mounted() { 
    // this.getRoleAuth();
  },
  watch:{
    roleId(val){
      //console.log(val)
      this.getRoleAuth();
    }
  },
  methods: {
      handleSubmit(name){ 
        let data =this.$refs[name].getCheckedAndIndeterminateNodes() 
        console.log(data)
          this.$emit('on-success',data)
      },
    getRoleAuth() {
        getRoleAuthData({ id: this.roleId }).then(res => {
          console.log(res);
           this.data = res.data
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>