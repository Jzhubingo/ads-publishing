const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    token: {
        type: String
    },
    UpdateTime: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Session', sessionSchema);//将模式编译成模型