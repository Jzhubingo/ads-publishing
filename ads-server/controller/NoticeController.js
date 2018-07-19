const BaseController = require('./BaseController');
const NoticeService = require('../service/NoticeService')

class NoticeController extends BaseController {
    static async getNotices(ctx) {
        ctx.json(await NoticeService.getNotices(ctx.request.query));
    }

    // 发布公告
    static async publishNotice(ctx) {
        const {noticeTitle, content} = ctx.request.body;
        ctx.json(await NoticeService.publishNotice(noticeTitle, content));
    }

    // 删除单个公告
    static async removeNotice(ctx) {
        const noticeId = ctx.request.query.id;
        ctx.json(await NoticeService.removeNotice(noticeId));
    }

    // 批量删除公告
    static async removeNotices(ctx) {

    }
}

module.exports = NoticeController;