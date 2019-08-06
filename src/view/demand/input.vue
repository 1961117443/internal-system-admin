<template>
  <div>
    <Card>
      <p slot="title">需求录入</p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
        <Row>
          <Col span="15">
            <Row>
              <Col  span="8">
                <FormItem label="需求编号" prop="billCode">
                  <Input v-model="formValidate.billCode" :readonly="readonly"/> 
                </FormItem>
              </Col >
              <Col span="8">
                <FormItem label="客户名称" prop="customerName">
                  <Input v-model="formValidate.customerName" :readonly="readonly"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="录入日期" prop="inputDate">
                  <DatePicker v-model="formValidate.inputDate" type="date" :readonly="readonly"></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="本次软件版本号" prop="versionNumber">
                  <Input v-model="formValidate.versionNumber" :readonly="readonly"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="优先级" prop="priority">
                  <Select v-model="formValidate.priority" :disabled="readonly">
                    <Option value="急">急</Option>
                    <Option value="一般">一般</Option>
                    <Option value="不急">不急</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="理论交期" prop="theoryDate">
                  <DatePicker v-model="formValidate.theoryDate" :readonly="readonly"></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="客户状态" prop="clientRelationship">
                  <Select v-model="formValidate.clientRelationship" :disabled="readonly">
                    <Option value="实施中">实施中</Option>
                    <Option value="维护中">维护中</Option>
                    <Option value="其他">其他</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="计划完成日期" prop="plannedCompletionDate">
                  <DatePicker v-model="formValidate.plannedCompletionDate" :readonly="readonly"></DatePicker>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="所属模块" prop="moduleName">
                  <Input v-model="formValidate.moduleName" :readonly="readonly"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="需求提出者" prop="demander">
                  <Input v-model="formValidate.demander" :readonly="readonly"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="手机" prop="telephone">
                  <Input v-model="formValidate.telephone" :readonly="readonly"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="提出日期" prop="suggestDate">
                  <DatePicker v-model="formValidate.suggestDate" :readonly="readonly"></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="实施/客服" prop="implement">
                  <Input v-model="formValidate.implement" :readonly="readonly"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <!-- <FormItem label="不处理意见" prop="unDealMemo">
                  <Input
                    v-model="formValidate.unDealMemo"
                    type="textarea"
                    :autosize="{minRows: 2,maxRows: 5}" 
                  ></Input>
                </FormItem>-->
              </Col>
            </Row>
          </Col>
          <Col span="8">
            <FormItem>
              <Upload multiple action="//jsonplaceholder.typicode.com/posts/">
                <Button icon="ios-cloud-upload-outline" :readonly="readonly">上传附件</Button>
              </Upload>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="需求描述" prop="describe">
          <markdown-editor v-model="formValidate.describe" :readonly="readonly" />
        </FormItem>

        <FormItem>
          <Button v-show="!readonly" type="primary" :loading="loading" @click="handleSubmit('formValidate')">
            <span v-if="!loading">提交</span>
            <span v-else>提交...</span>
          </Button>
          <!-- <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button> -->
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import MarkdownEditor from "_c/markdown";
import { postDemand,get } from "@/api/demand";

export default {
  components: {
    MarkdownEditor
  },
  data() {
    return {
      loading:false, 
     // id:this.$route.params.id,
      formValidate: {
        id: "",
        billCode: "",
        inputDate: "",
        theoryDate: "",
        plannedCompletionDate: "",
        suggestDate: "",
        customerName: "",
        priority: "",
        versionNumber: "",
        clientRelationship: "",
        implement: "",
        demander: "",
        telephone: "",
        moduleName: "",
        describe: ""
      },
      ruleValidate: {
        billCode1: [
          {
            required: true,
            message: "需求编号不能为空",
            trigger: "blur",
            pattern: /^[a-z]+$/
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props:{
    id:{
      type:String,
      default:''
    },
    state:{
      type:String,
      default:'insert'
    }
  },
  mounted(){
    //  console.log(this.$route)
    this.get();
  },
  computed:{
    readonly(){
      return this.state==="browse"
    }
  },
  methods: {
    get(){
      get({id:this.id}).then(res=>{ 
        this.formValidate = res.data
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {  
          console.log(JSON.stringify(this.$refs[name].model));
          this.loading = true
          postDemand(this.$refs[name].model).then(res => {
            //console.log(res.data);
            // this.$Message.success(JSON.stringify(this.$refs[name].model)); 
            this.$Message.success("Success!");
            this.handleReset(name);
            this.$emit('on-success',res.data)
          }).finally(()=>this.loading = false);
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>