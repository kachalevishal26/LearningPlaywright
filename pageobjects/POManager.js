const { LoginPage } = require("./LoginPage");
const { DashboardPage } = require("./DashboardPage");
const { CheckoutPage } = require("./CheckoutPage");
const { PlaceorderPage } = require("./PlaceorderPage");
const { OrderPage } = require("./OrderPage");

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.placeOrderPage = new PlaceorderPage(this.page);
        this.orderPage = new OrderPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getPlaceOrderPage() {
        return this.placeOrderPage;
    }

    getOrderPage() {
        return this.orderPage;
    }
}
module.exports = {POManager};