const router = require('koa-router')();
const UserController = require('./controller/UserController');
const SessionController = require('./controller/SessionController');
const NoticeController = require('./controller/NoticeController');
const FrLinkController = require('./controller/FrLinkController');
const AdController = require('./controller/AdController');
router
    .get('/', UserController.get)
    .get('/findUser', UserController.findUser)
    .get('/user', UserController.getUser)               // 获取用户信息
    .get('/users', UserController.findAll)
    .post('/user', UserController.register)
    .delete('/user', UserController.removeUser)
    .put('/user', UserController.editUser)
    .put('/updatePwd', UserController.updatePassword)
    .put('/updateInfo', UserController.editUser)

    // 公告信息操作
    .get('/notice', NoticeController.getNotices)
    .post('/notice', NoticeController.publishNotice)
    .delete('/notice', NoticeController.removeNotice)

    //广告信息操作
    .post('/ad', AdController.publish)
    .get('/ad', AdController.getAds)
    .get('/ads', AdController.getAll)
    .get('/personalAds', AdController.getPersoanlAds)
    // 删除单行记录
    .delete('/ad', AdController.removeAd)
    // 批量删除记录
    .delete('/ads', AdController.removeAds)
    .get('/findAdType', AdController.findAdType)
    .get('/frLink', FrLinkController.getFrLinks)
    .post('/session', SessionController.login)
;
module.exports = (app) => {

    app.use(router.routes())
        .use(router.allowedMethods());
};
