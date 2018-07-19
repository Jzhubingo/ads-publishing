const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const noticeSchema = new Schema({
    // 公告标题
    noticeTitle:{
        type:String,
        default:''
    },
    // 公告内容
    content:{
        type:String,
        default:''
    },
    // 发布时间
    publishTime:{
        type:Date,
        default:Date.now()
    }
});
module.exports = mongoose.model('Notice',noticeSchema);