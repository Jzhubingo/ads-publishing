const BaseService = require('./BaseService');
const Ad = require('./../model/ad');

class AdService extends BaseService {
    // 发布广告
    static async publish(adTitle = '', adType = '', adLink = '', adAmount = 1, adAward = 10, adFee = 12, requirement = '', userId = '') {
        let ad = new Ad({adTitle, adType, adLink, adAmount, adAward, adFee, requirement, userId});
        ad = await ad.save();
        return this.success(ad, 201);

    }

    // 前台
    static async getAds() {
        let ads = await Ad.find().sort('-publishTime');
        return this.success(ads);
    }

    static async getPersoanlAds(userid = '') {
        let ads = await Ad.find({'userId': userid});
        return this.success(ads);
    }

    // 后台
    static async findAdType(adType = '') {
        let ads;
        if (adType === '') {
            ads = await Ad.find();
        } else {
            ads = await Ad.find({'adType': adType});
        }
        return this.success(ads);
    }

    // 表格获取数据
    static async getAll({count, page = 1, size = 10} = {}) {
        if (count) {
            return this.success(await Ad.find().count());
        }
        let ads = await Ad.find({}).limit(+size).skip(page * size - size).sort('-publishTime');
        return this.success(ads);
    }

    // 从表格删除单行数据
    static async removeAd(_id = '') {
        let ad = await Ad.findById(_id);
        ad = await ad.remove(ad);
        return this.success(ad);
    }

    // 批量删除
    static async removeAds(_id = []) {
        let ads = await Ad.find({})
    }
}

module.exports = AdService;