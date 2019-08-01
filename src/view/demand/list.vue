<template>
  <div>
    <h1>需求列表</h1>
    <li v-for="item in list" @click="getDescribe(item.id)" :key="item.id">
      <Button size="large">{{item.billCode}}</Button>
    </li>
  </div>
</template>

<script>
import { getList } from "@/api/demand";
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() { 
    this.getDemandList();
  },
  methods: {
    getDemandList() {
      getList().then(res => {
        this.list = res.data;
      });
    },
    getDescribe(id) {
      console.log(id);
      this.$router.push({
        path: "/demand/input",
        //不会把参数放在url上面
        //   params: {
        //     id: id
        //   }
        //会把参数放在url上面
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>