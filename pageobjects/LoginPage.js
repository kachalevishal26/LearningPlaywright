const { expect } = require("@playwright/test");

class LoginPage {

    constructor(page) {
        this.page = page;        
        this.uname = page.locator("#userEmail");
        this.upwd = page.locator("#userPassword");
        this.loginBtn = page.locator("#login");
        this.signOut = page.locator(".btn-custom").last();
    }
    async goTo() {
        await this.page.goto("https://www.rahulshettyacademy.com/client/");
    }

    async validLogin(username, password) {
        await this.uname.type(username);
        await this.upwd.type(password);
        await this.loginBtn.click();
        await this.page.waitForLoadState("networkidle");
    }

    async verifyLogin() {
        await expect(this.signOut).toBeVisible();
    }
}
module.exports = {LoginPage};