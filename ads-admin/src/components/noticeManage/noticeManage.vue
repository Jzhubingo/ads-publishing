<template>
  <div class="NoticeManage">
    <section>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-button type="primary" class="btn-publish" @click="noticePublish">发布公告</el-button>
      </el-col>
      <!--列表-->
      <el-table :data="notices" class="noticeTable"
                highlight-current-row
                v-loading="listLoading"
                @selection-change="selsChange"
                tooltip-effect="dark"
                style="width: 100%;">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="noticeTitle" label="公告标题" width="250" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="content" label="公告内容" width="350" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="publishTime" label="发布时间" width="250" sortable>
          <template slot-scope="scope">{{scope.row.publishTime | formatDate}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
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
      <!--发布界面-->
      <el-dialog title="发布新公告"
                 v-model="addFormVisible"
                 :visible.sync="addFormVisible"
                 :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="公告标题" prop="noticeTitle">
            <el-input v-model="addForm.noticeTitle" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="公告内容" prop="content">
            <el-input v-model="addForm.content" autoComplete="off"></el-input>
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

<script>
  import api from '../../api'

  export default {
    data() {
      return {
        notices: [],
        total: 100,
        currentPage: 1,
        pageSize: 5,
        listLoading: false,
        sels: [],//列表选中列

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          noticeTitle: [
            {required: true, message: '请输入公告标题', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入公告内容', trigger: 'blur'}
          ]
        },
        //新增界面数据
        addForm: {
          noticeTitle: '',
          content: ''
        }
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getNotices();
      },
//      获取数据总条数
      getNoticesCount() {
        api.get('/notice?count=1').then((res) => {
          this.total = res.data.data;
        })
      },
//      获取单页显示数目
      getNotices() {
        api.get(`/notice?page=${this.currentPage}&size=${this.pageSize}`).then((res) => {
          this.notices = res.data.data;
          this.listLoading = false;
        });
      },
//      发布广告
      noticePublish() {
        this.addFormVisible = true;
        this.addForm = {
          noticeTitle: '',
          content: ''
        };
      },
//      发布提交
      addSubmit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              let para = Object.assign({}, this.addForm);
              api.post('/notice', para).then((res) => {
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getNotices();
              });
            });
          }
        });
      },
      //删除单行记录
      handleDel(index, row) {
        this.$confirm('确认删除该记录？', '提示', {
          type: 'warning'
        }).then(() => {
//                    console.log(this.notices[index]._id);
          this.listLoading = true;
          api.delete('/notice?id=' + this.notices[index]._id).then((res) => {
            this.listLoading = false;
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            this.getNotices();
          });
        }).catch((err) => {
//          err.error;
        });
      },
//      批量删除
//      batchRemove() {
//        var ids = this.sels.map(item => item.id).toString();
//        this.$confirm('确认删除选中记录吗？', '提示', {
//          type: 'warning'
//        }).then(() => {
//          this.listLoading = true;
////          ***********
////          ***********
//        })
//      },
      selsChange(sels) {
        this.sels = sels;
      }
    },
    mounted() {
      this.getNoticesCount();
      this.getNotices();
    }
  }
</script>
<style lang="less">
  .NoticeManage {
    .toolbar {
      height: 60px;
      line-height: 60px;
      padding: 10px 2px;
      margin: 10px 0;
      background: #f2f2f2;
      .btn-publish, .batchDel {
        float: left;
        margin-left: 10px;
      }
    }
    .noticeTable {
      margin-top: 15px;
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
      .cell {
        /*white-space: nowrap;*/
        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
      }
      .el-table__header-wrapper {
        background-color: #eef1f6;
        border-bottom: 1px solid #dfe6ec;
      }
    }
  }
</style>
