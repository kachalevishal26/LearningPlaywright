const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');
const { exData } = require('../utils/FixtureData');
const dataSet = JSON.parse(JSON.stringify(require('../utils/ExternalData.json')));
const multipleDataSet = JSON.parse(JSON.stringify(require('../utils/MultipleSetData.json')));

// test.describe.configure({mode: 'parallel'});
test("@Web Page Object Test",async({page}) => {
    const poManager = new POManager(page);
    const countryName = "ind";
    const fullCountryName = " India";

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(dataSet.username, dataSet.password);
    await loginPage.verifyLogin();

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(dataSet.productName);
    await dashboardPage.navToCart();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.prCheckout(dataSet.productName);
    await checkoutPage.getProductLocator(dataSet.productName);
    await checkoutPage.checkOut();

    const placeOrderPage = poManager.getPlaceOrderPage();
    await placeOrderPage.personalInfo();
    await placeOrderPage.shippingInfo(countryName, fullCountryName);
    await placeOrderPage.placeOrder();

    const orderPage = poManager.getOrderPage();
    await orderPage.orderInfo();
});

// for(const mulData of multipleDataSet) {
// test(`Web-Testing for ${mulData.username}`, async({page}) => {
//     const poManager = new POManager(page);

//     const loginPage = poManager.getLoginPage();
//     await loginPage.goTo();
//     await loginPage.validLogin(mulData.username, mulData.password);
//     // await loginPage.verifyLogin();
// });
// }

exData(`Test data through Fixtures`, async({page, loginData}) => {
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(loginData.username, loginData.password);
    // await loginPage.verifyLogin();
});

test("@Web Web Practice", async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.rahulshettyacademy.com/client/");
    const name = "zara coat 3";
    const uName = page.locator("#userEmail");
    const uPwd = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
    const products = page.locator(".card-body");

    await uName.type("vk@sbt.com");
    await uPwd.type("Vishal@26");
    await page.waitForLoadState("networkidle");
    await loginBtn.click();
    const productTitles = await page.locator(".card-body b").allTextContents();
    console.log(productTitles);
    
    const count = await products.count();
    console.log(count);
    for(let i=0;i<count;++i) {
        if(await products.nth(i).locator("b").textContent() === name) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("[type='button']").last().click();
    const dd1 = page.locator("select.input").first();
    const dd2 = page.locator("select.input").last();
    await dd1.selectOption("06");
    await dd2.selectOption("26");
    await page.locator("div[class*='small'] input").first().type("125");
    await page.locator("div[class='field'] input").last().type("Vishal Kachale");
    await page.locator("div[class*='small'] input").last().type("rahulshetty");
    await page.locator("[placeholder*='Country']").type("ind",{delay: 100});
    const dropdown = page.locator("[class*='ta-result']");
    await dropdown.waitFor();
    const totalCount = await dropdown.locator("button").count();
    for(let i=0;i<totalCount;++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await page.locator(".action__submit").click();
    await page.locator(".hero-primary").waitFor();
    const thanksPage = await page.locator(".hero-primary").isVisible();
    expect(thanksPage).toBeTruthy();
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("li [routerlink*='myorders']").click();
    await page.locator("[class*=table-hover]").waitFor();
    const items = page.locator("tbody tr");
    const itemCount = await items.count();
    console.log(itemCount);
    for(let i=0; i< itemCount; ++i) {
        const exId = await items.nth(i).locator("th").textContent();
        if(orderId.includes(exId)) {
            await items.nth(i).locator("button").first().click();
            break; 
        }
    }
    const orderDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderDetails)).toBeTruthy();
});

test('Browser Context', async ({page}) => {
    const userName = page.locator("#username");
    const userPassword = page.locator("#password");
    const signIn = page.locator("#signInBtn");
    const cardTitle = page.locator(".card-body a");
    const username = "rahulshettyacademy";
    const password = "learning";

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await userName.type("Vishal Kachale");
    await userPassword.type(password);
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block;']")).toContainText("Incorrect");
    await userName.fill("");
    await userName.type(username);
    await Promise.all(
        [
            page.waitForURL("https://rahulshettyacademy.com/angularpractice/shop"),
            signIn.click(),
        ]
    );
    // console.log(await cardTitle.first().textContent());
    // console.log(await cardTitle.nth(1).textContent());
    const allTitles = await cardTitle.allTextContents();
    console.log(allTitles); 
});

test('@daily UI Controls', async({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const uPwd = page.locator("[type='password']");
    const user = page.locator(".customradio");
    const alertBtn = page.locator("#okayBtn");
    const typeDd = page.locator("select.form-control");
    const chkBox = page.locator("#terms");
    const signIn = page.locator("#signInBtn");

    await userName.type("Vishal Kachale");
    await uPwd.type("learning");
    await user.last().click();
    await alertBtn.click();
    await expect(page.locator(".customradio").last()).toBeChecked();
    await typeDd.selectOption("consult");
    await chkBox.click();
    expect(await page.locator("#terms").isChecked()).toBeTruthy();
    // await signIn.click(); 
});

test("alert test",async({page}) => {
    await page.goto("https://www.hyrtutorials.com/p/alertsdemo.html");  
    page.on("dialog", async(dialog) => {
        await dialog.accept("Vishal");
    });
    await page.locator("#promptBox").click();
    console.log(await page.locator("#output").textContent());
});

test("TestBlink", async({page}) => {
    page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const loc = page.locator("[href*='documents']");
    await expect(loc).toHaveAttribute("class","blinkingText");  
});

test("@Web Window Handles", async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const documentLink = page.locator("[href*='documents']");
    //if there are more than 2 tabs then add names in array
    const [newPage, newPage2] = await Promise.all( 
        [
            context.waitForEvent('page'),
            documentLink.click(),
        ]
    );
    const txt = await newPage.locator(".red").textContent();
    console.log(txt);
    const txtArray = txt.split(" ");
    const text = txtArray[5];
    await page.locator("#username").type(text);
});

test("frames test", async({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const pageFrame = page.frameLocator("#courses-iframe");
    await pageFrame.locator("li a[href=lifetime-access]:visible").click();
    const fullText = await pageFrame.locator(".text h2").textContent();
    const text = fullText.split(" ")[1];
    console.log(text);
});

test("Luma Test", async ({page}) => {
    await page.goto("https://magento2.algolia.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvMi5hbGdvbGlhLmNvbS8%2C/");
    console.log(page.title());
    await expect(page).toHaveTitle("Customer Login");

    const item = page.locator("#ui-id-1 a");

    await page.locator("#email").type("vk@sbt.com");
    await page.locator("#pass").type("Vishal@26");
    await page.locator("#send2").click();
    await page.waitForLoadState('networkidle');
    const allItems = await item.allTextContents();
    console.log(allItems);
});

test("date picker", async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.lambdatest.com/selenium-playground/jquery-date-picker-demo");
    await page.locator("#from").click();
    await page.locator("#ui-datepicker-div").waitFor();
    var monDd = page.locator(".ui-datepicker-month");
    await page.waitForTimeout(1000);
    var year = await page.locator(".ui-datepicker-year").textContent();
    console.log(year);
    while(!(year === "2024")) {
        await page.locator("span.ui-icon").last().click();
        year = await page.locator(".ui-datepicker-year").textContent();
    }
    await monDd.selectOption("5");
    await page.locator("text=26").click();
});