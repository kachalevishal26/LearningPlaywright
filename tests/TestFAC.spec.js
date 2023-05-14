const {test, expect} = require('@playwright/test');

test("Login Page", async({page}) => {
    await page.goto("https://ca.fifthavenuecollection.com/login");
    const email = page.locator("#Username");
    const pwd = page.locator("#Password");
    const btn = page.locator("[value='Log in']");
    await email.first().type("vk@sbt.com");
    await pwd.first().type("123456");
    await btn.first().click();
    await expect(page.locator(".validation-summary-errors span")).toContainText("Login was unsuccessful.");
    await pwd.first().fill("");
    await pwd.first().type("Vishal@26");
    await btn.first().click();
    await expect(page).toHaveTitle("Fifth Avenue Collection - Canada");
    await page.waitForLoadState('networkidle');
    const catList = await page.locator(".category-navigation-list-wrapper a").allTextContents();
    console.log(catList);
});

test("Ui Controls Test", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const uName = page.locator("#username");
    const uPwd = page.locator("#password");
    const userType = page.locator(".customradio");
    const alertBtn = page.locator("#okayBtn");
    const roleDd = page.locator("select.form-control");
    const termsChk = page.locator("#terms");
    const loginBtn = page.locator("#signInBtn");

    await uName.type("Vishal Kachale");
    await uPwd.type("learning");
    await userType.last().click();
    await alertBtn.click();
    await expect(page.locator(".customradio").last()).toBeChecked();
    await roleDd.selectOption("consult");
    await termsChk.click();
    expect(await page.locator("#terms").isChecked()).toBeTruthy();
    await loginBtn.click();
})

test.only("@daily E-commerce - Place Order", async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.rahulshettyacademy.com/client/");
    
    const uName = page.locator("#userEmail");
    const uPwd = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
    const prodName = "zara coat 3";
    const product = page.locator(".card-body");

    await expect(page).toHaveTitle("Let's Shop");
    await uName.type("vk@sbt.com");
    await uPwd.type("Vishal@26");
    await loginBtn.click();
    await page.waitForLoadState('networkidle');
    
    const productCount = await product.count();
    console.log(productCount);
    for(let i = 0;i < productCount;++i) {
        const text = await product.nth(i).locator("b").textContent();
        if(text === prodName) {
            await product.nth(i).locator("text= Add To Cart").click();
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator(".cart li").waitFor();
    const item = await page.locator(".cart h3").isVisible();
    expect(item).toBeTruthy();
    await page.locator("[type=button]").last().click();
    const dd1 = page.locator("select").first();
    const dd2 = page.locator("select").last();
    await dd1.selectOption("06");
    await dd2.selectOption("26");
    await page.locator("div[class*='small'] input").first().type("125");
    await page.locator("[name='coupon']").type("rahulshetty");
    await page.locator("div[class='field'] input").last().type("Vishal Kachale");
    const dd = page.locator("[placeholder*='Country']");
    await dd.type("ind",{delay:100});
    const dropdown = page.locator("section[class*='ta-results']");
    await dropdown.waitFor();
    const count = await dropdown.locator("button").count();
    for(let i=0;i<count;++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

});