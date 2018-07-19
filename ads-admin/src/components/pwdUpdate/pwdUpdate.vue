<template>
  <div class="pwdUpdate">
    <el-col :span="12" :offset="6">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
               class="demo-ruleForm myForm">
        <el-form-item label="当前密码" prop="oldPass">
          <el-input type="password" v-model="ruleForm.oldPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input type="password" v-model="ruleForm.newPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>
<script type="text/ecmascript-6">
  import api from '../../api'

  export default {
    data() {
      var validateOldPass = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入当前密码'));
        }
        callback();
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          oldPass: '',
          newPass: '',
          checkPass: ''
        },
        rules: {
          oldPass: [
            {validator: validateOldPass, trigger: 'blur'}
          ],
          newPass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updatePassword();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      updatePassword() {
        this.$confirm('确认修改密码?', '提示', {
          type: 'warning'
        }).then(() => {
          api.put(`/updatePwd?userid=${this.$store.state.userId}&oldPassword=${this.ruleForm.oldPass}&newPassword=${this.ruleForm.newPass} `).then((res) => {
            this.$message.success('修改成功');
          }).catch(() => {
            this.$message.error('旧密码输入错误');
          });
        }).catch(() => {
          console.log('修改密码操作已取消');
        });
      }
    }
  }
</script>
<style lang="less" scoped>
  .pwdUpdate {
    /*margin: 100px;*/
    .myForm {
      margin-top: 100px;
    }
  }
</style>
