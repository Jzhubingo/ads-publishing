const BaseService = require('./BaseService');
const FrLink = require('./../model/frLink');

class FrLinkService extends BaseService {
    static async getFrLinks() {
        let FrLinks = await FrLink.find();
        return this.success(FrLinks);
    }
}

module.exports = FrLinkService;