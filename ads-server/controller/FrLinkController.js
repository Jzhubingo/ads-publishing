const BaseController = require('./BaseController');
const FrLinkService = require('../service/FrLinkService')

class FrLinkController extends BaseController {
    static async getFrLinks(ctx) {
        ctx.json(await FrLinkService.getFrLinks())
    }
}

module.exports = FrLinkController;