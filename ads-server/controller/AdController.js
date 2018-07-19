const BaseController = require('./BaseController');
const AdService = require('../service/AdService')

class AdController extends BaseController {
    // 发布任务
    static async publish(ctx) {
        const {adTitle, adType, adLink, adAmount, adAward, adFee, requirement, userId} = ctx.request.body;
        ctx.json(await AdService.publish(adTitle, adType, adLink, adAmount, adAward, adFee, requirement, userId));
    }

    // 前台首页获取任务信息
    static async getAds(ctx) {
        ctx.json(await AdService.getAds(ctx.request.query));
    }

    // 后台
    static async getAll(ctx) {
        ctx.json(await AdService.getAll(ctx.request.query));
    }

    // 获取个人发布的任务
    static async getPersoanlAds(ctx) {
        const userid = ctx.request.query.userId;
        ctx.json(await AdService.getPersoanlAds(userid));
    }

    //按任务类型查询
    static async findAdType(ctx) {
        const adType = ctx.request.query.adType;
        ctx.json(await AdService.findAdType(adType));
    }

    // 删除单行任务
    static async removeAd(ctx) {
        const adId = ctx.request.query.id;
        ctx.json(await AdService.removeAd(adId));
    }

    // 批量删除记录
    static async removeAds(ctx) {
        const adIds = ctx.request.query.id;
        ctx.json(await AdService.removeAds(adIds));
    }
}

module.exports = AdController;