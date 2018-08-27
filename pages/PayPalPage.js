function PayPalPage() {

    this.checkPage = function () {
        casper.then(function () {
            casper.test.assertExists('a#cancelLink');
            // casper.test.assertSelectorHasText('.merchantName.ng-binding.ng-scope', 'TERRACOTTA MAGYARORSZÁG KFT.');
        });
    };

    this.clickLogIn = function () {
        casper.then(function () {
            this.clickLabel('Bejelentkezés', 'a');
        });
    };

    this.checkLoginEmailPage = function () {
        casper.then(function () {
            casper.test.assertExists('#email');
        });
    };

    this.checkLoginPasswPage = function () {
        casper.then(function () {
            casper.test.assertExists('#password');
        });
    };

    this.checkLoginPage = function () {
        casper.then(function () {
            casper.test.assertExists('#email');
            casper.test.assertExists('#password');
        });
    };

    this.fillLoginEmailForm = function (name) {
        casper.then(function () {
            casper.fill('form.proceed.maskable', {
                'login_email': name //userConfig.PayPalEmail
            });
        });
    }

    this.fillLoginPasswForm = function (passw) {
        casper.then(function () {
            casper.fill('form.proceed.maskable', {
                'login_password': passw //userConfig.PayPalPassw
            });
        });
    }

    this.fillLoginForm = function (name, passw) {
        casper.then(function () {
            casper.fill('form.proceed', {
                'login_email': name, //userConfig.PayPalEmail,
                'login_password': passw//userConfig.PayPalPassw
            });
        });
    }

    this.clickLoginEmailPageContinue = function () {
        casper.then(function () {
            this.clickLabel('Tovább', 'button');
        });
    }

    this.clickLoginPageLogIn = function () {
        casper.then(function () {
            this.clickLabel('Bejelentkezés', 'button');
        });
    }

    this.clickContinue = function () {
        casper.then(function () {
            this.click('#confirmButtonTop');
        });
    }

}

module.exports = PayPalPage;
