<template>
  <div>
    <h1>自定义公式计算器</h1>

    <Form ref="formDynamic" :model="formDynamic" :label-width="100" style="width: 300px">
      <FormItem label="请输入公式">
        <Input
          ref="formula"
          type="textarea"
          v-model="formDynamic.formula"
          placeholder="请输入公式..."
          style="width: 300px;"
          size="large"
          :clearable="true"
          @on-change="handleChange"
        />
      </FormItem>
      <FormItem
        v-for="(item, index) in formDynamic.items"
        :key="index"
        :label="'参数 ' + item.name"
        :prop="'items.' + index + '.value'"
        :rules="{required: true, message: 'Item ' + item.name +' can not be empty', trigger: 'blur'}"
      >
        <Row>
          <Col span="18">
            <Input v-model="item.value" placeholder="请输入参数值..."></Input>
          </Col>
        </Row>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formDynamic')">计算</Button> 
        <Button @click="handleReset('formDynamic')" style="margin-left: 8px">重置参数</Button>
        <Button @click="handleResetFormula('formDynamic')" style="margin-left: 16px">清空公式</Button>
      </FormItem>
    </Form>
    <h1>计算结果:{{result}}</h1> 
    <Button v-for="item in buttons" :key="item.name" type="dashed" @click="handleButton(item.value)" style="margin-left: 8px">{{item.title}}</Button>
  </div>
</template>

<script>
import {postFormulaData} from '@/api/sys'
export default {
  data() {
    return {
      result:0,
      formDynamic: {
        formula: "", 
        items: []
      },
      buttons:[
        {key:"加",title:'加',value:"+"},
        {key:"减",title:'减',value:"-"},
        {key:"乘",title:'乘',value:"*"},
        {key:"除",title:'除',value:"/"},
        {key:"p",title:'加参数',value:":"},
        {key:"pow",title:'平方',value:"pow(,)"},
        {key:"sqrt",title:'开方',value:"sqrt()"}
      ]
    };
  },
  created(){
      if (this.formDynamic.formula.length>0) {
          this.handleChange()
      }
  },
  methods: {
    handleResetFormula(){
      this.formDynamic.formula= ''
this.$refs['formula'].focus()
    },
    handleButton(type){
      this.formDynamic.formula+=type
      this.$refs['formula'].focus()
    },
    handleReset(name){
      this.$refs[name].model.items.forEach(item => {
        item.value=""
      });
    },
    handleSubmit(name){
      this.$refs[name].validate(valid => {
        if (valid) {
          let data =this.$refs[name].model      
          postFormulaData(data).then(res=>{
            res=res.data
            if (res.Success) {
              this.result = res.Data
            }
            else{
              console.log(res.Message)
            }
          })  
        }
      });
          
    },
    handleChange() {
        let i = 0;
        let str=this.formDynamic.formula 
        let index=str.indexOf(":")
        let arr = []
        while(index>-1){ 
            if (str.length>0) {
               // console.log('字符串['+str+']....位置['+index+']')
                let p=str.substr(index,2)
                if (!arr.find(w=>w.name==p)) {
                    arr.push({name:p,value:0})
                }
                
             //   console.log('参数['+p+']')
                str=str.substring(index+2)
                //console.log('字符串['+str+']')
                index=str.indexOf(":")
               // console.log('位置['+index+']')
            }
            else{
                break
            }
            
            i=i+1;
            if (i>100) {
                break;
            }
        }
        this.formDynamic.items = arr
    }
  }
};
</script>

<style lang="scss" scoped>
</style>