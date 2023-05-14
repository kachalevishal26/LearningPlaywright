const { expect } = require("@playwright/test");

class PlaceorderPage {
    constructor(page) {
        this.page = page;
        this.dd1 = page.locator("select.input").first();
        this.dd2 = page.locator("select.input").last();
        this.cvv = page.locator("div[class*='small'] input").first();
        this.cardname = page.locator("div[class='field'] input").last();
        this.coupon = page.locator("div[class*='small'] input").last();
        this.couponBtn = page.locator("[type=submit]");
        this.uName = page.locator("input.ng-dirty");
        this.countryDd = page.locator("[placeholder*='Country']");
        this.ddValues = page.locator("[class*='ta-result']");
        this.placeOrdBtn = page.locator(".action__submit");
    }

    async personalInfo() {
        await this.dd1.selectOption("06");
        await this.dd2.selectOption("26");
        await this.cvv.type("123");
        await this.cardname.type("Vishal Kachale");
        await this.coupon.type("rahulshetty");
        await this.couponBtn.click();
    }

    async shippingInfo(countryName, fullCountryName) {
        await this.page.waitForTimeout(4000);
        // await expect(this.uName).toHaveText(username);
        await this.countryDd.type(countryName, {delay:100});
        await this.ddValues.waitFor();
        const ddValCount = await this.ddValues.locator("button").count();
        console.log(ddValCount);
        for(let i=0;i<ddValCount;++i) {
            const text = await this.ddValues.locator("button").nth(i).textContent();
            if(text === fullCountryName) {
                await this.ddValues.locator("button").nth(i).click();
                break;
            }
        }
    }

    async placeOrder() {
        await this.placeOrdBtn.click();
    }
}
module.exports = {PlaceorderPage};