<template>
  <Form
      ref="userForm" 
      label-position="right"
       :label-width="80"
    >
      <FormItem label="用户账号">
        <Input v-model="user.userCode" placeholder="请输入用户账号"></Input>
      </FormItem>
      <FormItem prop="userName" label="用户名称">
        <Input v-model="user.userName" placeholder="请输入用户名称">
          <!-- <span slot="prepend">
            <Icon :size="16" type="ios-person"></Icon>
          </span> -->
        </Input>
      </FormItem>
    </Form>
</template>

<script>
export default {
  name: 'UserForm',
  props: {
    // user:{
    //   type: Object,
    //   default:()=>{  }
    // }
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
      user: {
        userCode: '',
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
  created(){
    console.log (this.user)
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
