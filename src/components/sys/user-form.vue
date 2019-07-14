<template>
  <Form
      ref="userForm"
      :model="form"
      label-position="right"
       :label-width="80"
    >
      <FormItem label="用户账号">
        <Input v-model="form.userCode" placeholder="请输入用户账号"></Input>
      </FormItem>
      <FormItem prop="userName" label="用户名称">
        <Input v-model="form.userName" placeholder="请输入用户名">
          <span slot="prepend">
            <Icon :size="16" type="ios-person"></Icon>
          </span>
        </Input>
      </FormItem>
    </Form>
</template>

<script>
export default {
  name: 'UserForm',
  props: {
    // userNameRules: {
    //   type: Array,
    //   default: () => {
    //     return [{ required: true, message: "账号不能为空", trigger: "blur" }];
    //   }
    // },
    // passwordRules: {
    //   type: Array,
    //   default: () => {
    //     return [{ required: true, message: "密码不能为空", trigger: "blur" }];
    //   }
    // }
  },
  data () {
    return {
      form: {
        userCode: 'admin',
        userName: ''
      }
    }
  },
  computed: {
    // rules() {
    //   return {
    //     userName: this.userNameRules,
    //     password: this.passwordRules
    //   };
    // }
  },
  beforeCreate () {
    console.log(this)
  },
  created () {
    console.log(this)
  },
  methods: {
    handleSubmit () {
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
}
</script>

<style lang="scss" scoped>
</style>
