import Vue from 'vue'
import Router from 'vue-router'
import admin from './../components/admin/admin.vue'
// import index from './../components/index/index.vue'
import userManage from './../components/userManage/userManage.vue'
import adsManage from './../components/adsManage/adsManage.vue'
import publish from './../components/adsManage/publish.vue'
import noticeManage from './../components/noticeManage/noticeManage.vue'
// import userMessage from './../components/userMessage/userMessage.vue'
import personalInfo from './../components/personalInfo/personalInfo.vue'
import pwdUpdate from './../components/pwdUpdate/pwdUpdate.vue'
import login from './../components/login/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: login,
      name: '',
      hidden: true
    },
    {
      path: '/',
      hidden: true,
      redirect: 'login'
    },
    // {
    //   path: '/admin',
    //   name: '系统首页',
    //   hidden: true,
    //   component: admin
    // },
    // {
    //   path: '/admin',
    //   iconCls: 'fa fa-home',
    //   leaf: true,//只有一个节点
    //   name: '',
    //   component: admin,
    //   children: [
    //     {
    //       path: '/index',
    //       name: '系统首页',
    //       component: index
    //     }
    //   ]
    // },
    {
      path: '/admin',
      iconCls: 'fa fa-user-o',
      leaf: true,//只有一个节点
      name: '',
      component: admin,
      children: [
        {
          path: '/userManage',
          name: '用户管理',
          component: userManage
        }
      ]
    },
    {
      path: '/admin',
      iconCls: 'fa fa-tasks',
      name: '广告管理',
      component: admin,
      children: [
        {
          path: '/adsManage',
          name: '广告列表',
          component: adsManage
        },
        {
          path: '/publish',
          name: '发布广告',
          component: publish
        },
      ]
    },
    {
      path: '/admin',
      name: '',
      iconCls: 'fa fa-bullhorn',
      leaf: true,//只有一个节点
      component: admin,
      children: [
        {
          path: '/noticeManage',
          name: '公告管理',
          component: noticeManage
        }
      ]
    },
    // {
    //   path: '/admin',
    //   name: '',
    //   iconCls: 'fa fa-bell-o',
    //   leaf: true,//只有一个节点
    //   component: admin,
    //   children: [
    //     {
    //       path: '/userMessage',
    //       name: '系统消息',
    //       component: userMessage
    //     }
    //   ]
    // },
    {
      path: '/admin',
      iconCls: 'fa fa-edit',
      name: '个人中心',
      component: admin,
      children: [
        {
          path: '/personalInfo',
          name: '详细资料',
          component: personalInfo
        },
        {
          path: '/pwdUpdate',
          name: '修改密码',
          component: pwdUpdate
        },
      ]
    }
  ]
})
