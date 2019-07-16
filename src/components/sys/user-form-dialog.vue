<template>
  <Modal
    ref="userDialog"
    v-model="show"
    :title="title"
    :rules="rules"
    :loading="true"
    :mask-closeable="false"
  >
    <div slot="header" style="fontSize:14px;fontWeight:bold">
      <span>{{title}}</span>
    </div>
    <Form ref="userForm" :model="form" label-position="right" :rules="rules" :label-width="100">
      <FormItem label="用户账号" prop="userCode">
        <Input v-model="form.userCode" placeholder="请输入用户账号"></Input>
      </FormItem>
      <FormItem label="用户名称" prop="userName">
        <Input v-model="form.userName" placeholder="请输入用户名称">
          <!-- <span slot="prepend">
            <Icon :size="16" type="ios-person"></Icon>
          </span>-->
        </Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button size="large" @click="cancleSubmit(form)">取消</Button>
      <Button type="primary" size="large" @click="handleSubmit(form)">确定</Button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "UserFormDialog",
  data: function() {
    return {
      show: false,
      title: "admin",
      form: {
        userCode: "",
        userName: ""
      }
    };
  },
  methods: {
    cancleSubmit(params) {
      // this.$Modal.remove()
      this.show = false;
      console.log(this);
    },
    handleSubmit(params) {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.$emit("on-success-valid", this.form);
        }
      });
    }
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules
      };
    }
  },
  props: {
    // show:{
    //   type:Boolean,
    //   default:false
    // },
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "账号不能为空", trigger: "blur" }];
      }
    }
  }
};
</script>

<style>
</style>

      