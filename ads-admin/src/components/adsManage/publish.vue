<template>
  <div class="publish">
    <el-col :span="24" :offset="4">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm myForm">
        <el-form-item label="任务类型" prop="adType">
          <el-select v-model="ruleForm.adType" placeholder="请选择任务类型">
            <el-option label="线上投票" value="线上投票"></el-option>
            <el-option label="会员注册" value="会员注册"></el-option>
            <el-option label="发帖转载" value="发帖转载"></el-option>
            <el-option label="广告浏览" value="广告浏览"></el-option>
            <el-option label="问卷调查" value="问卷调查"></el-option>
            <el-option label="其它类型" value="其它类型"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务标题" prop="adTitle">
          <el-input v-model="ruleForm.adTitle"></el-input>
        </el-form-item>
        <el-form-item label="任务链接" prop="adLink">
          <el-input type="url" v-model="ruleForm.adLink"></el-input>
        </el-form-item>
        <el-form-item label="奖励单价" prop="adAward">
          <el-input-number v-model="ruleForm.adAward" :min="10"></el-input-number>
        </el-form-item>
        <el-form-item label="任务份数" prop="adAmount">
          <el-input-number v-model="ruleForm.adAmount" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="发布费用" prop="adFee()">
          <el-input-number
            v-model="adFee" disabled></el-input-number>
        </el-form-item>
        <el-form-item label="任务要求" prop="requirement">
          <el-input type="textarea" v-model="ruleForm.requirement" placeholder="填写任务具体要求"></el-input>
        </el-form-item>
		<el-form-item label="审核要求" prop="auditing">
          <el-input type="textarea" v-model="ruleForm.auditing"
                    placeholder="填写任务完成后用户提交结果的方式：1：提交用户ID；2：提交截图">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
          <el-button type="danger" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

  </div>
</template>
<script>
  import api from '../../api'

  export default {
    data () {
      return {
        ruleForm: {
          adTitle: '',
          adType: '',
          adLink: '',
          adAmount: 1,
          adAward: 10,
          requirement: '',
		  auditing: '',
          userId: localStorage.getItem('userId')
        },
        rules: {
          adTitle: [
            {required: true, message: '请输入任务标题', trigger: 'blur'},
            {min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur'}
          ],
          adType: [
            {required: true, message: '请选择任务类型', trigger: 'change'}
          ],
          adLink: [
            {required: true, message: '请提供任务链接', trigger: 'blur'},
            {pattern: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/, message: '请输入正确网址格式'}
          ],
          requirement: [
            {required: true, message: '请填写任务要求', trigger: 'blur'}
          ],
		  auditing: [
            {required: true, message: '请填写任务提交方式', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      adFee: {
        set: function (val) {
          this.ruleForm.adFee = val
        },
        get: function () {
          this.ruleForm.adFee = this.ruleForm.adAmount * (this.ruleForm.adAward + 2)
          return this.ruleForm.adFee
        }
      }
    },
    methods: {
      submitForm (formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
//            alert('submit!');
            api.post('/ad', this.ruleForm).then((res) => {
              res = res.data
              if (res.status === 0) {
                alert('任务发布成功！')
                this.$router.push('/adsManage')
              } else {
                alert('任务发布失败！' + res.message())
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style lang="less" scoped>
  .publish {
    width: 700px;
    .myForm {
      margin-top: 30px;
    }
  }
</style>
