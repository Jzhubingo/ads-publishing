const BaseService = require('./BaseService');
const User = require('./../model/user');
const uuid = require('./../util').uuid;
const Session = require('./../model/session');

class SessionService extends BaseService {

    static async login(username = '', password = '') {
        let user = new User({username, password});
        const error = this.validate(user);
        if (error) {
            return error;
        }
        user = await User.findOne({username});
        if (user) {
            if (password === user.password) {
                let session = await Session.findOne({user: user._id});
                const token = uuid();
                if (!session){
                    session=new Session({user,token,UpdateTime:Date.now()});
                }else {
                    session.token = token;
                    session.UpdateTime = Date.now();
                }
                session = await session.save();
                // 返回 _id 和 token
                return this.success({
                    userId: user._id,
                    token,
                });
            } else {
                return this.failure("密码不正确！");
            }
        } else {
            return this.failure('用户名不存在！');
        }
    }


}

module.exports = SessionService;