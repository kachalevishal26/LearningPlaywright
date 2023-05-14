const { expect } = require("@playwright/test");

class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.prWait = page.locator("div li").first();
        this.prName = page.locator("h3:has-text('iphone 13 pro')");
        this.checkout = page.locator("[type='button']").last();
    }

    async prCheckout(productName) {
        await this.prWait.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }

    async checkOut() {
        await this.checkout.click();
    }

    getProductLocator(productName) {
        return this.page.locator("h3:has-text('"+productName+"')");
    }
}
module.exports = {CheckoutPage};