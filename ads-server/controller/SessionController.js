const BaseController = require('./BaseController');
const SessionService = require('../service/SessionService');

class SessionController extends BaseController {

    static async login(ctx){
        console.log(ctx.request.body);
        const {username, password} = ctx.request.body;
        ctx.json(await SessionService.login(username, password));
    }
}

module.exports = SessionController;
