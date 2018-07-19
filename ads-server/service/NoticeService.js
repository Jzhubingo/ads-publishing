const BaseService = require('./BaseService');
const Notice = require('./../model/notice');

class NoticeService extends BaseService {
    static async getNotices({count, page = 1, size = 10} = {}) {
        if (count) {
            return this.success(await Notice.find().count());
        }
        let notices = await Notice.find({}).limit(+size).skip(page * size - size).sort('-publishTime');
        return this.success(notices);
    }

    // 发布公告
    static async publishNotice(noticeTitle = '', content = '') {
        let notice = new Notice({noticeTitle, content});
        notice = await notice.save();
        return this.success(notice, 201);
    }

    // 删除公告
    static async removeNotice(_id = '') {
        let notice = await Notice.findById(_id);
        notice = await notice.remove(notice);
        return this.success(notice);
    }

    // 批量删除公告
    static async removeNotices() {

    }
}

module.exports = NoticeService;