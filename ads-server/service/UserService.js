const BaseService = require('./BaseService');
const User = require('./../model/user');

class UserService extends BaseService {

    /**
     *
     * @param _id
     * @param opt
     * @returns {Promise<*>}
     */
    static async findById(_id = '', opt = {}) {
        let user = await User.findById(_id);// find({_id: 'xxx', }) findOne()
        // 过滤掉用户密码和相关不必要信息
        // let {__v, password, ...filteredInfo} = user._doc;
        return this.success(user);
    }

    static async findByName(username = '') {
        let user;
        if (username === '') {
            user = await User.find();
        } else {
            user = await User.find({'username': {'$regex': username, '$options': 'i'}});
        }
        return this.success(user);
    }

    static async findAll({count, page = 1, size = 10} = {}) {
        if (count) {
            return this.success(await User.find().count());
        }
        let users = await User.find({}, '-password').limit(+size).skip(page * size - size);
        return this.success(users);
    }

    // 删除用户
    static async removeUser(_id = '') {
        let user = await User.findById(_id);
        user = await user.remove(user);
        return this.success(user);

    }

    /**
     * 注册
     * @param username
     * @param password
     * @returns {Promise<*>}
     */
    static async register(username = '', password = '') {
        let user = new User({username, password});
        const error = this.validate(user);
        if (error) {
            return error;
        }
        if (await User.findOne({username})) {
            return this.failure('用户名已经存在了', 400);
        }
        user = await user.save();
        return this.success(user, 201);
    }

    static async updatePassword(userid = '', oldPassword = '', newPassword = '') {
        let user = await User.findById(userid);
        // console.log(user);
        if (user) {
            if (oldPassword === user.password) {
                user.password = newPassword;
                const error = this.validate(user);
                if (error) {
                    return error;
                }
                await user.save();
                return this.success();
            } else {
                return this.failure('旧密码输入错误', 400);
            }
        } else {
            return this.failure();
        }
    }

    static async updateInfo(_id = '', info = {}) {
        let user = await User.findById(_id);
        if (user) {
            for (let key in info) {
                user[key] = info[key];
            }
            const error = this.validate(user);
            if (error) {
                return error;
            }
            await user.save();
            return this.success();
        } else {
            return this.failure();
        }
    }
}

module.exports = UserService;