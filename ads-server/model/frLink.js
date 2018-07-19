const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const frLinkSchema = new Schema({
    // 广告标题
    linkName: {
        type: String,
        default: '',
    },
    // 广告内容
    linkUrl: {
        type: String,
        default: '',
    }
});

module.exports = mongoose.model('FrLink', frLinkSchema);//将模式编译成模型