<template>
  <div class="login">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
             label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="title">管理员登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" @keyup.enter.native="handleSubmit"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;"
                   @click.native.prevent="handleSubmit" :loading="logining">登录
        </el-button>
        <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from '../../api'

  export default {
    data () {
      return {
        logining: false,
        ruleForm: {
          account: '',
          checkPass: ''
        },
        rules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            //{ validator: validaePass }
          ],
          checkPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            //{ validator: validaePass2 }
          ]
        }
//        checked: true
      }
    },
    methods: {
//      resetForm(formName) {
//        this.$refs[formName].resetFields();
//      },
      handleSubmit () {
        this.$refs.ruleForm.validate((valid) => {
            if (valid) {
              this.logining = true
              var loginParams = {username: this.ruleForm.account, password: this.ruleForm.checkPass}
              api.post('/session', loginParams).then((res) => {
                this.logining = false
                if (res.data.status === 0) {
                  localStorage.setItem('userId', res.data.data.userId)
                  this.$router.push('/userManage')
                }
              }).catch(() => {
                this.logining = false
                this.$message({
                  message: '账号或者密码错误！',
                  type: 'error'
                })
              })
            }
            else {
              console.log('error submit!!')
              return false
            }
          }
        )
      }
    }
  }

</script>

<style lang="less" scoped>
  .login {

    .login-container {
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      margin: 180px auto;
      width: 350px;
      padding: 35px 35px 15px 35px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
      .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
      }
      /*.remember {*/
      /*margin: 0px 0px 35px 0px;*/
    }
  }

</style>
