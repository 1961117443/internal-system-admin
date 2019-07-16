<template>
  <Form ref="userForm" :model="user" :rules="rules" label-position="right" :label-width="100">
    <FormItem label="用户账号" prop="userCode">
      <Input v-model="user.userCode" :disabled="EditState || BrowseState" placeholder="请输入用户账号"></Input>
    </FormItem>
    <FormItem prop="userName" label="用户名称">
      <Input v-model="user.userName" :disabled="BrowseState" placeholder="请输入用户名称">
        <!-- <span slot="prepend">
            <Icon :size="16" type="ios-person"></Icon>
        </span>-->
      </Input>
    </FormItem>
  </Form>
</template>

<script>
import { BillState } from "@/data";
export default {
  name: "UserForm",
  props: {
    user: {
      type: Object,
      default: () => {}
    },
    state: {
      type: Number,
      default: 0
    },
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "账号不能为空", trigger: "blur" }];
      }
    },
    // passwordRules: {
    //   type: Array,
    //   default: () => {
    //     return [{ required: true, message: "密码不能为空", trigger: "blur" }];
    //   }
    // }
  }, 
  computed: {
    EditState() {
      return (BillState.edit & this.state) === BillState.edit
    },
    NewState() {
      return (BillState.add & this.state) === BillState.add
    },
    BrowseState(){
      return (BillState.browse & this.state) === BillState.browse
    },
    rules() {
      return {
        userName: this.userNameRules
        //password: this.passwordRules
      };
    }
  },
  methods: {
    handleSubmit() {
      // this.$refs.loginForm.validate((valid) => {
      //   if (valid) {
      //     this.$emit('on-success-valid', {
      //       userName: this.form.userName,
      //       password: this.form.password
      //     })
      //   }
      // })
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
