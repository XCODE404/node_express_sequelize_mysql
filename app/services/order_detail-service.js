// Import the required modules
const MstRoleService = require("./mst_role-service");
const { RESPONSE_MESSAGE } = require("../utils/constants");
const OrderDetailRepository = require("../repository/order_detail-repository");
const { NotFoundError, ValidationError } = require("../utils/errors/app-errors");
const { CapitalizeFirstLetter, EncodePassword, TodayDate, DuplicateData, UserAgent, ComparePassword, MakeToken } = require("../utils");

// All Business logic will be here
class OrderDetailService {

    static async signIn(req) {
        const { email, password } = req.body.data; //JSON.parse(atob(req.body.data));

        // check exist order_detail
        const order_detail = await OrderDetailRepository.signIn(email);
        if (!order_detail) throw new NotFoundError(RESPONSE_MESSAGE.NOT_FOUND);

        // check password
        const password_check = await ComparePassword(password, order_detail.password);
        if (!password_check) throw new ValidationError(RESPONSE_MESSAGE.INVALID_PASSWORD);

        // make token
        let token = await MakeToken({ order_detail_id: order_detail.order_detail_id, role: order_detail.mst_role.name });

        return { order_detail: order_detail, token: token };
    };

    static async initSignUpOrderDetail(req) {
        // get admin role id
        const role = await MstRoleService.getMstRole("init");

        const reqOrderDetail = {};
        reqOrderDetail.role_id = role[0].role_id;
        reqOrderDetail.name = CapitalizeFirstLetter("developer 1");
        reqOrderDetail.email = "developer1@gmail.com"
        reqOrderDetail.password = await EncodePassword("12345678");
        reqOrderDetail.date_of_joining = await TodayDate();
        reqOrderDetail.created_agent = await UserAgent(req.useragent);
        reqOrderDetail.updated_agent = await UserAgent(req.useragent);

        // check exist order_detail
        const isExistOrderDetail = await OrderDetailRepository.isExistOrderDetail(reqOrderDetail.email);
        await DuplicateData(isExistOrderDetail);

        return await OrderDetailRepository.createOrderDetail(reqOrderDetail);
    }

    static async createOrderDetail(req) {
        const reqOrderDetail = req.body.data; //JSON.parse(atob(req.body.data));

        reqOrderDetail.name = CapitalizeFirstLetter(reqOrderDetail.name);
        reqOrderDetail.password = await EncodePassword(reqOrderDetail.password);
        reqOrderDetail.date_of_joining = reqOrderDetail.date_of_joining? reqOrderDetail.date_of_joining : await TodayDate();
        reqOrderDetail.created_agent = await UserAgent(req.useragent);
        reqOrderDetail.updated_agent = await UserAgent(req.useragent);

        // check exist order_detail
        const isExistOrderDetail = await OrderDetailRepository.isExistOrderDetail(reqOrderDetail.email);
        await DuplicateData(isExistOrderDetail);

        return await OrderDetailRepository.createOrderDetail(reqOrderDetail);
    }

    static async getOrderDetail(req) {
        return await OrderDetailRepository.getOrderDetail(req);
    }

    static async selectedOrderDetail(req) {
        const { order_detail_id } = req.params;

        return await OrderDetailRepository.selectedOrderDetail(order_detail_id);
    }

    static async updateOrderDetail(req) {
        const { order_detail_id } = req.params;
        const reqOrderDetail = req.body.data; //JSON.parse(atob(req.body.data));
        
        const order_detail = await OrderDetailRepository.selectedOrderDetail(order_detail_id);
        if (order_detail.results === null) throw new NotFoundError(RESPONSE_MESSAGE.NOT_FOUND);

        return await OrderDetailRepository.updateOrderDetail(order_detail_id, reqOrderDetail);
    }

    static async deleteOrderDetail(req) {
        const { order_detail_id } = req.params;

        const order_detail = await OrderDetailRepository.selectedOrderDetail(order_detail_id);
        if (order_detail.results === null) throw new NotFoundError(RESPONSE_MESSAGE.NOT_FOUND);

        return await OrderDetailRepository.deleteOrderDetail(order_detail_id);
    }
}

module.exports = OrderDetailService;