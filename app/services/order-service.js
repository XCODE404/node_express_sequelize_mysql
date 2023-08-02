// Import the required modules
const { TodayDate, UserAgent } = require("../utils");
const { RESPONSE_MESSAGE } = require("../utils/constants");
const { NotFoundError } = require("../utils/errors/app-errors");
const OrderRepository = require("../repository/order-repository");
const OrderDetailRepository = require("../repository/order_detail-repository");

// All Business logic will be here
class OrderService {

    static async createOrder(req) {
        const reqOrder = req.body.data; //JSON.parse(atob(req.body.data));

        reqOrder.order_date = reqOrder.order_date? reqOrder.order_date : await TodayDate();
        reqOrder.created_employee = req.employee.employee_id;
        reqOrder.updated_employee = req.employee.employee_id;
        reqOrder.created_agent = await UserAgent(req.useragent);
        reqOrder.updated_agent = await UserAgent(req.useragent);

        const order = await OrderRepository.createOrder(reqOrder);
        
        // create order detail
        let orderDetails = reqOrder.order_details;
        orderDetails.forEach(async (orderDetail) => {
            orderDetail.order_id = order.order_id;
            orderDetail.created_agent = await UserAgent(req.useragent);
            orderDetail.updated_agent = await UserAgent(req.useragent);
            await OrderDetailRepository.createOrderDetail(orderDetail);
        });

        return order;
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

        await OrderRepository.updateOrder(order_id, reqOrder);

        reqOrder.updated_agent = await UserAgent(req.useragent);
        
        // update order detail
        let orderDetails = reqOrder.order_details;
        orderDetails.forEach(async (orderDetail) => {
            orderDetail.updated_agent = await UserAgent(req.useragent);
            await OrderDetailRepository.updateOrderDetail(orderDetail.order_detail_id, orderDetail);
        });
    }

    static async deleteOrder(req) {
        const { order_id } = req.params;

        const order = await OrderRepository.selectedOrder(order_id);
        if (order.results === null) throw new NotFoundError(RESPONSE_MESSAGE.NOT_FOUND);

        await OrderRepository.deleteOrder(order_id);
        await OrderDetailRepository.deleteOrderDetailByOrder(order_id);
    }
}

module.exports = OrderService;