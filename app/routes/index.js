const CategoryRoutes = require("./category.routes");
const base_api_url = process.env.BASE_API_URL;

class Routes {
    constructor(app) {
        this.app = app;
        this.setupRoutes();
    }

    setupRoutes() {
        this.app.use(base_api_url + '/category', CategoryRoutes);
        this.app.use(base_api_url + '/product', CategoryRoutes);
        this.app.use(base_api_url + '/employee', CategoryRoutes);
        this.app.use(base_api_url + '/sub-category', CategoryRoutes);
        this.app.use(base_api_url + '/order', CategoryRoutes);
    }   
}

// Create an instance of the UserController
const routes = new Routes();

module.exports = routes;