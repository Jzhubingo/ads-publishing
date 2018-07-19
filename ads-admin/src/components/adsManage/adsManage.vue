<template>
  <div class="userManage">
    <section>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="filters" class="myForm" onsubmit="return false">
          <el-form-item>
            <el-input v-model="filters.adType" @keyup.enter.native="findAdType" placeholder="按任务类型查询"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="findAdType">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table :data="ads" class="userTable" highlight-current-row
                v-loading="listLoading"
                @selection-change="selsChange"
                tooltip-effect="dark"
                style="width: 100%;">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="adType" label="任务类型" width="100">
        </el-table-column>
        <el-table-column prop="adTitle" label="任务标题" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="adLink" label="任务链接" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="requirement" label="任务要求" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="userId" label="发布者id" width="100" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="publishTime" label="发布时间" width="100" sortable>
          <template slot-scope="scope">{{scope.row.publishTime | formatDate}}</template>
        </el-table-column>
        <el-table-column prop="adState" label="任务状态" width="100">
          <template slot-scope="scope">{{scope.row.adState | formatAdState}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import api from '../../api'

  export default {
    data () {
      return {
        filters: {
          adType: ''
        },
        ads: [],
        total: 100,
        currentPage: 1,
        pageSize: 5,
        listLoading: false,
        sels: [],//列表选中列
      }
    },
    methods: {
      selsChange (val) {
        this.sels = val
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getAds()
      },
//      查询任务类型
      findAdType () {
        this.listLoading = true
        api.get('/findAdType?adType=' + this.filters.adType).then((res) => {
          this.listLoading = false
          this.ads = res.data.data
        })
      },
      getAdsCount () {
        api.get('/ads?count=1').then((res) => {
          this.total = res.data.data
        })
      },
      getAds () {
        api.get(`/ads?page=${this.currentPage}&size=${this.pageSize}`).then((res) => {
          this.ads = res.data.data
          this.listLoading = false
        })
      },
      //删除单行记录
      handleDel (index, row) {
        this.$confirm('确认删除该记录？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true
//          console.log(this.ads[index]._id);
          api.delete('/ad?id=' + this.ads[index]._id).then((res) => {
            this.listLoading = false
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getAds()
          })
        })
      },
//      批量删除
//      batchRemove () {
//        var ids = this.sels.map(item => item.id).toString()
//        console.log(ids)
////        this.$confirm('确认删除选中记录吗？', '提示', {
////          type: 'warning'
////        }).then(() => {
////          this.listLoading = true
////          api.delete('/ads?id=' + ids).then((res) => {
////            this.listLoading = false
////            this, $message({
////              message: '删除成功',
////              type: 'success'
////            })
////            this.getAds()
////          })
////        })
//      },
    },
    mounted () {
      this.getAdsCount()
      this.getAds()
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
