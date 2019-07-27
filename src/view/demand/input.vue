<template>
  <div>
    <Card>
      <p slot="title">需求录入</p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
        <Row>
          <Col span="12">
            <Row>
              <Col span="8">
                <FormItem label="需求编号" prop="billCode">
                  <Input v-model="formValidate.billCode"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="客户名称" prop="customerName">
                  <Input v-model="formValidate.customerName"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="录入日期" prop="inputDate">
                  <DatePicker v-model="formValidate.inputDate"></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="本次软件版本号" prop="versionNumber">
                  <Input v-model="formValidate.versionNumber"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="优先级" prop="priority">
                  <Select v-model="formValidate.priority">
                    <Option value="急">急</Option>
                    <Option value="一般">一般</Option>
                    <Option value="不急">不急</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="理论交期" prop="theoryDate">
                  <DatePicker v-model="formValidate.theoryDate"></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="客户状态" prop="clientRelationship">
                  <Select v-model="formValidate.clientRelationship">
                    <Option value="实施中">实施中</Option>
                    <Option value="维护中">维护中</Option>
                    <Option value="其他">其他</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="计划完成日期" prop="plannedCompletionDate">
                  <DatePicker v-model="formValidate.plannedCompletionDate"></DatePicker>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="所属模块" prop="moduleName">
                  <Input v-model="formValidate.moduleName"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="需求提出者" prop="demander">
                  <Input v-model="formValidate.demander"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="手机" prop="telephone">
                  <Input v-model="formValidate.telephone"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="提出日期" prop="suggestDate">
                  <DatePicker v-model="formValidate.suggestDate"></DatePicker>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="实施/客服" prop="implement">
                  <Input v-model="formValidate.implement"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="不处理意见" prop="unDealMemo">
                  <Input
                    v-model="formValidate.unDealMemo"
                    type="textarea"
                    :autosize="{minRows: 2,maxRows: 5}" 
                  ></Input>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span="12">
            <FormItem>
              <Upload multiple action="//jsonplaceholder.typicode.com/posts/">
                <Button icon="ios-cloud-upload-outline">上传附件</Button>
              </Upload>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="需求描述" prop="describe">
          <markdown-editor v-model="formValidate.describe" />
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          <!-- <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button> -->
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import MarkdownEditor from "_c/markdown";
import { postDemand } from '@/api/demand'

export default {
  components: {
    MarkdownEditor
  },
  data() {
    return {
      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        describe: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
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
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
            postDemand(this.$refs[name].model).then(res=>{
                console.log(res.data)
                   // this.$Message.success(JSON.stringify(this.$refs[name].model));

                        this.$Message.success("Success!");
                        this.handleReset(name)
            }) 
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