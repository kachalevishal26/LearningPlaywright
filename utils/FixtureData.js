const base = require('@playwright/test');

exports.exData = base.test.extend(
    {
    loginData : {
        username : "vishal@sbt.com",
        password : "Vishal@26"
    }
})