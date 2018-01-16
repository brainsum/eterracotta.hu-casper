var fs = require('fs');

var HomePageFile = require('../pages/HomePage.js');
var homePage = new HomePageFile();

var FlowerStandsPageFile = require('../pages/FlowerStandsPage.js');
var flowerStandsPage = new FlowerStandsPageFile();

var ClayPotPageFile = require('../pages/ClayPotPage.js');
var clayPotPage = new ClayPotPageFile();

var CartPageFile = require('../pages/CartPage.js');
var cartPage = new CartPageFile();

var CheckoutPageFile = require('../pages/CheckoutPage.js');
var checkoutPage = new CheckoutPageFile();

var CheckoutReviewPageFile = require('../pages/CheckoutReviewPage.js');
var checkoutReviewPage = new CheckoutReviewPageFile();

var CheckoutCompletePageFile = require('../pages/CheckoutCompletePage.js');
var checkoutCompletePage = new CheckoutCompletePageFile();

var PayPalPageFile = require('../pages/PayPalPage.js');
var payPalPage = new PayPalPageFile();

var formData = [
        'test@yahoo.com',
        'Test Pers',
        'Magyarország',
        '4000',
        'Budapest',
        'Szív utca',
        '0757000999',
        'Ez csak egy teszt rendelés!'
    ];

casper.test.begin('Test for buy', function suite(test) {
    casper.start(siteConfig.siteURL, function() {
        casper.myCapture('front-page');
    });

    homePage.checkPage();

    // homePage.selectFlowerStands();

    // // redirect to the 'Virágtartók' page
    // casper.waitForUrl(siteConfig.flowerStandsURL,
    //     function then() {
    //         // casper.echo('Page: ' + casper.getTitle() + ' ' + siteConfig.flowerStandsURL, 'TRACE');
    //         test.assertExists('h1.page-header');
    //         test.assertSelectorHasText('h1.page-header', 'Virágtartók');
    //         casper.echo('\n' + 'flowerStands-Url: ' + casper.getCurrentUrl(), 'TRACE');
    //         casper.myCapture('flowerStands-page');
    //     },
    //     function onWaitTimeout() {
    //         casper.myCapture('flowerStands-page-timeout');
    //         casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
    //     },
    //     40000
    // );

    casper.thenOpen(siteConfig.flowerStandsURL, function() {
        // casper.echo('Page: ' + casper.getTitle() + ' ' + siteConfig.flowerStandsURL, 'TRACE');
        casper.echo('\n' + 'flowerStands-Url: ' + casper.getCurrentUrl(), 'TRACE');
        casper.myCapture('flowerStands-page');
    });

    flowerStandsPage.checkPage();

    flowerStandsPage.selectClayPot();

    casper.waitForUrl(siteConfig.clayPotURL,
        function then() {
            casper.echo('\n' + 'clayPot-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('clayPot-page');
        },
        function onWaitTimeout() {
            casper.myCapture('clayPot-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        30000
    );

    clayPotPage.checkPage();

    clayPotPage.addToCart();

    casper.waitForSelector('.alert.alert-block.alert-success.messages.status', function() {
        test.assertExists('.alert.alert-block.alert-success.messages.status');
        test.assertTextExists('bekerült a', 'The selected item gone to the shopping cart.');
        casper.myCapture('clayPot-addToCart-page');
    });

    casper.waitForSelector('#cart-popup', function() {
        test.assertExists('.line-item-summary-view-cart.first');
    });

    clayPotPage.viewCart();

    casper.waitForUrl(siteConfig.cartURL,
        function then() {
            casper.echo('\n' + 'cart-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('cart-page');
        },
        function onWaitTimeout() {
            casper.myCapture('cart-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        30000
    );

    cartPage.checkPage();

    cartPage.clickPay();

    casper.waitForUrl(/checkout\/\d*/,
        function then() {
            casper.echo('\n' + 'checkout-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('checkout-page');
        },
        function onWaitTimeout() {
            casper.myCapture('checkout-Url-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        30000
    );

    checkoutPage.checkPage();

    checkoutPage.fillForm(formData);

    casper.then(function() {
        casper.myCapture('filled-checkout-page');
    });

    checkoutPage.clickVerifyOrder();

    casper.waitForUrl(/checkout\/\d*\/review/,
        function then() {
            casper.echo('\n' + 'checkout-review-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('checkout-review-page');
        },
        function onWaitTimeout() {
            casper.myCapture('checkout-review-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        30000
    );

    checkoutReviewPage.fillTermsConditions();

    checkoutReviewPage.clickPay();

    // casper.waitForUrl(/.*www.sandbox.paypal.com\/.*\/checkout\/signup/,
    //     function then() {
    //         casper.echo('\n' + 'payPal-checkout-signup-Url: ' + casper.getCurrentUrl(), 'TRACE');
    //         casper.myCapture('payPal-checkout-signup-page');
    //     },
    //     function onWaitTimeout() {
    //         casper.myCapture('payPal-checkout-signup-page-timeout');
    //         casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
    //     },
    //     30000
    // );

    casper.waitForSelector('a.btn.full.ng-binding',
        function then() {
            casper.echo('\n' + 'payPal-checkout-signup-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('payPal-checkout-signup-page');
        },
        function onWaitTimeout() {
            casper.myCapture('payPal-checkout-signup-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        30000
    );

    payPalPage.checkPage();

    payPalPage.clickLogIn();

    casper.waitForSelector('#injectedUnifiedLogin',
        function then() {
            casper.echo('\n' + 'payPal-Login-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('payPal-login-page');
            casper.wait(5000);
        },
        function onWaitTimeout() {
            casper.myCapture('payPal-login-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        30000
    );

    payPalPage.checkLoginPage();

    // @NOTE: To use paypal sandbox, edit this:
    // http://localhost:8000/admin/commerce/config/payment-methods/manage/commerce_payment_paypal_ec/edit/3
    // A, Set API from live to sandbox
    // B, Set up sandbox credentials:
    //     1, Log in with the sandbox "business" account (facilitator)
    //     2, Go to profile / selling tools / api / NVP/SOAP API integration / View signature
    //        https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_profile-api-access
    //     3, Paste the credentials into the inputs on terracotta
    // @NOTE: Fill with buyer ("personal") sandbox account

    casper.withFrame('injectedUl', function(){
        // casper.myCapture('paypal-login-iframe-page');
        payPalPage.fillLoginForm(userConfig.PayPalEmail, userConfig.PayPalPassw);
        casper.myCapture('payPal-filled-login-iframe-page');
        payPalPage.clickLoginPageLogIn();
    });

    casper.then(function() {
        casper.myCapture('paypal-filled-login-page');
    });

    casper.waitForSelector('#confirmButtonTop',
        function then() {
            casper.echo('\n' + 'PayPal-Logined-Url: ' + casper.getCurrentUrl(), 'TRACE');
            // casper.myCapture('payPal-checkout-review-page');
        },
        function onWaitTimeout() {
            casper.myCapture('payPal-checkout-review-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        30000
    );

    casper.then(function() {
        casper.myCapture('payPal-checkout-review-page');
    });

    payPalPage.clickContinue();

    casper.waitForUrl(/checkout\/\d*\/complete/,
        function then() {
            casper.echo('\n' + 'checkout-complete-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('checkout-complete-page');
        },
        function onWaitTimeout() {
            casper.myCapture('checkout-complete-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        30000
    );

    checkoutCompletePage.checkPage();

    casper.run(function() {
        casper.test.done();
    });

});
