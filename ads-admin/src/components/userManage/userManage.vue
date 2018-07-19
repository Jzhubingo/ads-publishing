<template>
  <div class="userManage">
    <section>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="filters" class="myForm" onsubmit="return false">
          <el-form-item>
            <el-input v-model="filters.username" @keyup.enter.native="findUser" placeholder="按用户名查询"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="findUser">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUser">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table :data="users" class="userTable" highlight-current-row
                v-loading="listLoading"
                @selection-change="selsChange"
                tooltip-effect="dark"
                style="width: 100%;">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="110" sortable>
        </el-table-column>
        <el-table-column prop="_id" label="用户id" width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="110" sortable>
          <template slot-scope="scope">{{scope.row.gender | formatGender}}</template>
        </el-table-column>
        <el-table-column prop="accountBalance" label="账户余额" width="160" sortable>
        </el-table-column>
        <el-table-column prop="registerTime" label="注册时间" width="160" sortable>
          <template slot-scope="scope">{{scope.row.registerTime | formatDate}}</template>
        </el-table-column>
        <!--<el-table-column prop="imageUrl" label="头像链接" width="150" show-overflow-tooltip>-->
        <!--</el-table-column>-->
        <el-table-column prop="role" label="角色" width="160">
          <template slot-scope="scope">{{scope.row.role | formatRole}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="handleEdit(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0" class="batchDel">批量删除</el-button>-->
        <el-pagination layout="prev, pager, next"
                       @current-change="handleCurrentChange"
                       :currentPage="currentPage"
                       :page-size="pageSize"
                       :total="total"
                       style="float:right;">
        </el-pagination>
      </el-col>
      <!--编辑界面-->
      <el-dialog title="编辑用户信息" v-model="editFormVisible" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
          <el-form-item label="用  户  ID " prop="userId">
            <el-input v-model="editForm._id" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="username">
            <el-input v-model="editForm.username" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户性别">
            <el-radio-group v-model="editForm.gender">
              <el-radio class="radio" :label="1">男</el-radio>
              <el-radio class="radio" :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用户角色">
            <el-radio-group v-model="editForm.role" disabled>
              <el-radio class="radio2" :label="1">管理员</el-radio>
              <el-radio class="radio2" :label="0">普通用户</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="账户余额" prop="accountBalance">
            <el-input-number v-model="editForm.accountBalance" :min="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="头像链接" prop="imageUrl" style="display: none;">
            <el-input v-model="editForm.imageUrl" disabled></el-input>
          </el-form-item>
          <el-form-item label="注册时间" prop="registerTime">
            <el-input v-model="editForm.registerTime" disabled></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>
      <!--新增界面-->
      <el-dialog title="新增用户" v-model="addFormVisible" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="addForm.password" autoComplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from '../../api'

  export default {
    data () {
      return {
        filters: {
          username: ''
        },
        users: [],
        total: 100,
        currentPage: 1,
        pageSize: 5,
        listLoading: false,
        sels: [],//列表选中列
//编辑界面是否显示
        editFormVisible: false,
        editLoading: false,
        editFormRules: {
//          username: [
//            {required: true, message: '请输入用户名', trigger: 'blur'}
//          ],
//          accountBalance: [
//            {required: true, message: '请初始化账户余额', trigger: 'blur'}
//          ]
        },
        //编辑界面数据
        editForm: {
          _id: '',
          username: '',
          gender: 1,
          accountBalance: '',
          imageUrl: '',
          registerTime: '',
          role: '1'
        },
//新增界面是否显示
        addFormVisible: false,
        addLoading: false,
        addFormRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        },
        //新增界面数据
        addForm: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      handleCurrentChange (val) {
        this.currentPage = val
        this.getUsers()
      },
//      查询用户
      findUser () {
        this.listLoading = true
        api.get('/findUser?username=' + this.filters.username).then((res) => {
          this.listLoading = false
          this.users = res.data.data
        })
      },
      getUserCount () {
        api.get('/users?count=1').then((res) => {
          this.total = res.data.data
        })
      },
      getUsers () {
        api.get(`/users?page=${this.currentPage}&size=${this.pageSize}`).then((res) => {
          this.users = res.data.data
          this.listLoading = false
        })
      },
//      新增用户
      addUser () {
        this.addFormVisible = true
        this.addForm = {
          username: '',
          password: '',
        }
      },
//      新增用户提交
      addSubmit () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true
              let para = Object.assign({}, this.addForm)
              api.post('/user', para).then((res) => {
                this.addLoading = false
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.$refs['addForm'].resetFields()
                this.addFormVisible = false
                this.getUsers()
              })
            })
          }
        })
      },
//      编辑记录
      handleEdit (index, row) {
        this.editFormVisible = true
        this.editForm = Object.assign({}, row)
      },
      //编辑提交
      editSubmit () {
        this.$confirm('确认修改该记录？', '提示').then(() => {
          api.put(`/updateInfo`, {id: this.editForm._id, infos: this.editForm}).then((res) => {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.editFormVisible = false
            this.getUsers()
          })
        })
      }
      ,
      //删除单行记录
      handleDel (index, row) {
        this.$confirm('确认删除该记录？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true
//          console.log(this.users[index]._id);
          api.delete('/user?id=' + this.users[index]._id).then((res) => {
            this.listLoading = false
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getUsers()
          })
        })
      },
//      批量删除
//      batchRemove () {
//        var ids = this.sels.map(item => item.id).toString()
//        this.$confirm('确认删除选中记录吗？', '提示', {
//          type: 'warning'
//        }).then(() => {
//          this.listLoading = true
//        })
//      },
      selsChange (val) {
        this.sels = val
      }
    },
    mounted () {
      this.getUserCount()
      this.getUsers()
    }
  }
</script>
<style lang="less">
  .userManage {
    .toolbar {
      height: 60px;
      line-height: 60px;
      padding: 10px 2px;
      margin: 10px 0;
      background: #f2f2f2;
      .myForm, .batchDel {
        float: left;
        margin-left: 10px;
      }
    }
    .userTable {
      border: 1px solid #e2e2e2;
      border-radius: 5px;
      th {
        overflow: hidden;
        background-color: #eef1f6;
        text-align: left;
        color: #000;
        font-weight: bold;
      }
      td {
        border-bottom: 1px solid #dfe6ec;
        text-align: left;
      }
      .el-table__header-wrapper {
        background-color: #eef1f6;
        border-bottom: 1px solid #dfe6ec;
      }
    }
  }
</style>
