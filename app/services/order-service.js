// Import the required modules
const { CapitalizeFirstLetter, EncodePassword, TodayDate, DuplicateData, UserAgent, ComparePassword, MakeToken } = require("../utils");
const { RESPONSE_MESSAGE } = require("../utils/constants");
const { NotFoundError, ValidationError } = require("../utils/errors/app-errors");
const OrderRepository = require("../repository/order-repository");
const MstRoleService = require("./mst_role-service");

// All Business logic will be here
class OrderService {

    static async signIn(req) {
        const { email, password } = req.body.data; //JSON.parse(atob(req.body.data));

        // check exist order
        const order = await OrderRepository.signIn(email);
        if (!order) throw new NotFoundError(RESPONSE_MESSAGE.NOT_FOUND);

        // check password
        const password_check = await ComparePassword(password, order.password);
        if (!password_check) throw new ValidationError(RESPONSE_MESSAGE.INVALID_PASSWORD);

        // make token
        let token = await MakeToken({ order_id: order.order_id, role: order.mst_role.name });

        return { order: order, token: token };
    };

    static async initSignUpOrder(req) {
        // get admin role id
        const role = await MstRoleService.getMstRole("init");

        const reqOrder = {};
        reqOrder.role_id = role[0].role_id;
        reqOrder.name = CapitalizeFirstLetter("developer 1");
        reqOrder.email = "developer1@gmail.com"
        reqOrder.password = await EncodePassword("12345678");
        reqOrder.date_of_joining = await TodayDate();
        reqOrder.created_agent = await UserAgent(req.useragent);
        reqOrder.updated_agent = await UserAgent(req.useragent);

        // check exist order
        const isExistOrder = await OrderRepository.isExistOrder(reqOrder.email);
        await DuplicateData(isExistOrder);

        return await OrderRepository.createOrder(reqOrder);
    }

    static async createOrder(req) {
        const reqOrder = req.body.data; //JSON.parse(atob(req.body.data));

        reqOrder.name = CapitalizeFirstLetter(reqOrder.name);
        reqOrder.password = await EncodePassword(reqOrder.password);
        reqOrder.date_of_joining = reqOrder.date_of_joining? reqOrder.date_of_joining : await TodayDate();
        reqOrder.created_agent = await UserAgent(req.useragent);
        reqOrder.updated_agent = await UserAgent(req.useragent);

        // check exist order
        const isExistOrder = await OrderRepository.isExistOrder(reqOrder.email);
        await DuplicateData(isExistOrder);

        return await OrderRepository.createOrder(reqOrder);
    }

    static async getOrder(req) {
        return await OrderRepository.getOrder(req);
    }

    static async selectedOrder(req) {
        const { order_id } = req.params;

        return await OrderRepository.selectedOrder(order_id);
    }

    static async updateOrder(req) {
        const { order_id } = req.params;
        const reqOrder = req.body.data; //JSON.parse(atob(req.body.data));
        
        const order = await OrderRepository.selectedOrder(order_id);
        if (order.results === null) throw new NotFoundError(RESPONSE_MESSAGE.NOT_FOUND);

        return await OrderRepository.updateOrder(order_id, reqOrder);
    }

    static async deleteOrder(req) {
        const { order_id } = req.params;

        const order = await OrderRepository.selectedOrder(order_id);
        if (order.results === null) throw new NotFoundError(RESPONSE_MESSAGE.NOT_FOUND);

        return await OrderRepository.deleteOrder(order_id);
    }
}

module.exports = OrderService;