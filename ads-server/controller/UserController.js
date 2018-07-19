const BaseController = require('./BaseController');
const UserService = require('../service/UserService');

class UserController extends BaseController {
    static async get(ctx, next) {
        ctx.json({
            status: 0,
            code: 200,
            message: ' API 服务器正常运行中...',
            data: ctx.session,
        });
    }

    static async findUser(ctx) {
        const username = ctx.request.query.username;
        // console.log(username);
        ctx.json(await UserService.findByName(username));
    }

    // 查询单个用户
    static async getUser(ctx) {
        const userid = ctx.request.query.id;
        ctx.json(await UserService.findById(userid));
    }

    // 修改密码
    static async updatePassword(ctx) {
        const {userid, oldPassword, newPassword} = ctx.request.query;
        ctx.json(await UserService.updatePassword(userid, oldPassword, newPassword));
    }

    // 查询所有用户
    static async findAll(ctx) {
        ctx.json(await  UserService.findAll(ctx.request.query));
    }

    // 注册
    static async register(ctx) {
        // console.log(ctx.request.body);
        const {username, password} = ctx.request.body;
        ctx.json(await UserService.register(username, password));
    }

    // 编辑用户
    static async editUser(ctx) {
        const userid = ctx.request.body.id;
        const infos = ctx.request.body.infos;
        ctx.json(await  UserService.updateInfo(userid, infos));
    }

    // 删除用户
    static async removeUser(ctx) {
        const userid = ctx.request.query.id;
        ctx.json(await UserService.removeUser(userid));
    }
}

module.exports = UserController;
