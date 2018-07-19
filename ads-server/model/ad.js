const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adSchema = new Schema({
    // 任务标题
    adTitle: {
        type: String,
        default: '',
    },
    // 任务类型 vote：线上投票，register：会员注册，
    // reprint：发帖转载，adScan：任务浏览, 问卷调查，others:其他类型
    adType: {
        type: String,
        default: '其它类型',
        enum: ["线上投票", "会员注册", "发帖转载", "广告浏览", "问卷调查", "其它类型"]
    },
    // 任务链接
    adLink: {
        type: String,
        default: ''
    },
    // 任务奖励单价
    adAward: {
        type: Number,
        default: 10
    },
    // 任务数量
    adAmount: {
        type: Number,
        default: 1
    },
    // 发布费用
    adFee: {
        type: Number,
        dafault: 12
    },
    //任务状态 0：失效，默认1：正常
    adState: {
        type: Number,
        default: 1
    },
    // 要求
    requirement: {
        type: String,
        default: '',
    },
	    // 审核
    auditing: {
        type: String,
        default: ''
    },
    //发布时间
    publishTime: {
        type: Date,
        default: Date.now(),
    },
    // 任务发布者
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model('Ad', adSchema);//将模式编译成模型