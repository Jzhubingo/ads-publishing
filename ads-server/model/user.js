const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    // 用户名：登录用，唯一，不可修改
    username: {
        type: String,
        unique: true,
        required: [true, '用户名不能为空。'],
        minlength: [3, '用户名不能短于 3 个字符。'],
        maxlength: [20, '用户名不能长于 20 个字符。'],
    },
    // 密码
    password: {
        type: String,
        required: [true, '密码不能为空。'],
        minlength: [6, '密码不能短于 6 个字符。'],
        maxlength: [20, '密码不能长于 20 个字符。'],
    },
    // 性别： 1 男性， 0 女性
    gender: {
        type: Number,
        default: 1,
        enum: [0, 1],
    },
    accountBalance: {
        type: Number,
        default: 1000
    },
    imageUrl: {
        type: String,
        default: ''
    },
    // 注册时间
    registerTime: {
        type: Date,
        default: Date.now(),
    },
    role: {
        type: Number,
        default: 0,
        enum: [0, 1]
    }
});

module.exports = mongoose.model('User', userSchema);