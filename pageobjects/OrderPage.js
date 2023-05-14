const { expect } = require("@playwright/test");

class OrderPage {
    constructor(page) {
        this.page = page;
        this.thankLabel = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.ordersLink = page.locator("li [routerlink*='myorders']");
        this.itemsLoad = page.locator("[class*=table-hover]");
        this.items = page.locator("tbody tr");
        this.orderDetails = page.locator(".col-text");
    }

    async orderInfo() {
        await this.thankLabel.waitFor();
        const thanksPage = await this.thankLabel.isVisible();
        expect(thanksPage).toBeTruthy();
        const ordId = await this.orderId.textContent();
        console.log(ordId);
        await this.ordersLink.click();
        await this.itemsLoad.waitFor();
        const itemCount = await this.items.count();
        console.log(itemCount);
        for(let i=0; i< itemCount; ++i) {
            const exId = await this.items.nth(i).locator("th").textContent();
            if(ordId.includes(exId)) {
                await this.items.nth(i).locator("button").first().click();
                break; 
            }
        }
    }
}
module.exports = {OrderPage};