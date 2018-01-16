function PayPalPage() {

    this.checkPage = function () {
        casper.then(function () {
            casper.test.assertExists('a#cancelLink');
            // casper.test.assertSelectorHasText('.merchantName.ng-binding.ng-scope', 'TERRACOTTA MAGYARORSZÁG KFT.');
        });
    };

    this.clickLogIn = function () {
        casper.then(function () {
            this.clickLabel('Log In', 'a');
        });
    };

    this.checkLoginPage = function () {
        casper.then(function () {
            casper.test.assertExists('#email');
            casper.test.assertExists('#password');
        });
    };

    this.fillLoginForm = function (name, passw) {
        casper.then(function () {
            casper.fill('form.proceed', {
                'login_email': name, //userConfig.PayPalEmail,
                'login_password': passw//userConfig.PayPalPassw
            });
        });
    }

    this.clickLoginPageLogIn = function () {
        casper.then(function () {
            this.clickLabel('Log In', 'button');
        });
    }

    this.clickContinue = function () {
        casper.then(function () {
            this.click('#confirmButtonTop');
        });
    }

}

module.exports = PayPalPage;
