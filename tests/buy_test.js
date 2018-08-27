var HomePageFile = require('../pages/HomePage.js');
var homePage = new HomePageFile();

var LoginPageFile = require('../pages/LoginPage.js');
var loginPage = new LoginPageFile();

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

var now = new Date();

var testUser = casper.cli.get('test_user');
var gls_home = casper.cli.get('gls_home');

casper.test.begin('Test for buy', function suite(test) {

    casper.start(siteConfig.siteURL, function() {
       casper.myCapture('front-page');
    });

    if (testUser == "anonym" || !testUser) {
        casper.echo("Test with anonymous user! " + testUser);
    }
    else if (testUser == "auth") {
        casper.echo("Test with authenticated user! " + testUser);

        casper.thenOpen(siteConfig.loginURL, function() {
            casper.echo('\n' + 'login-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('login-page');
        });

        loginPage.checkPage();

        loginPage.fillForm(siteUserConfig.userName, siteUserConfig.userPassword);

        casper.then(function() {
            casper.myCapture('filled_login-page');
        });

        loginPage.submitForm();

        casper.waitForUrl(/users\/.*/,
            function then() {
                test.assertSelectorHasText('h1.page-header', 'Olcsóbban Kapó Partner');
                casper.echo('\n' + 'user-Url: ' + casper.getCurrentUrl(), 'TRACE');
                casper.myCapture('user-page');
            },
            function onWaitTimeout() {
                casper.myCapture('user-page-timeout');
                casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
            },
            10000
        );

        casper.thenOpen(siteConfig.siteURL, function() {
            casper.echo('\n' + 'homePage-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('home-page-page');
        });
    }
    else {
        casper.echo("The given type of user is invalid! " + testUser);
        casper.exit();
    }

    if (gls_home == "home" || !gls_home) {
        casper.echo("Test with home delivery! " + gls_home);
    }
    else if (gls_home == "gls") {
        casper.echo("Test with delivery to GLS Point! " + gls_home);
    }
    else {
        casper.echo("The given type of delivery is invalid! " + gls_home);
        casper.exit();
    }

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

    casper.waitForSelector('.alert.alert-block.alert-success.messages.status',
        function then () {
            test.assertExists('.alert.alert-block.alert-success.messages.status');
            test.assertTextExists('bekerült a', 'The selected item gone to the shopping cart.');
            casper.myCapture('clayPot-addToCart-page');
        },
        function onWaitTimeout() {
            casper.myCapture('clayPot-addToCart-page-timeout');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        30000
    );

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

    casper.then(function() {
        if (testUser != "auth") {
            casper.then(function() {
                checkoutPage.fillForm(formData);
            });

            casper.then(function() {
                checkoutPage.fillFormCashOnDelivery();
            });
        }
    });

    casper.then(function() {
        if (testUser == "auth") {
            casper.then(function() {
                // checkoutPage.fillFormOrderPerson(formData[1], now.getFullYear() + "." + (now.getMonth() + 1) + "." + now.getDate());
                casper.then(function() {
                    checkoutPage.fillFormCashOnDelivery();
                });
            });
        }
    });

    casper.then(function() {
        casper.myCapture('filled_delivery_for-checkout-page');
    });

    casper.then(function() {
        checkoutPage.fillFormRemark(formData[7]);
    });

    casper.then(function() {
        casper.myCapture('filled_remark_for-checkout-page');
    });

    casper.then(function() {
        casper.wait(20000);
        casper.myCapture('filled_data_for-checkout-page');
    });

    casper.then(function() {
        if (gls_home == "gls") {
            casper.then(function() {
                if (testUser == "anonym") {
                    checkoutPage.fillGlsPoint('gls_pont');
                }
                else if (testUser == "auth") {
                    checkoutPage.fillGlsPoint('gls_pont');
                }
            });

            casper.then(function() {
                casper.wait(10000);
                casper.myCapture('selected-GLS_Point-page');
            });

            casper.waitForText('Csillagvirág Gyógynövénybolt',
                function then() {
                    casper.myCapture('checkout-page-GLS-page');
                    // fs.write('casperlogs/logfile.html', casper.getHTML(), 'w');
                    test.assertExists('#psitems-canvas > div');
                    casper.click('#psitems-canvas > div');
                    casper.myCapture('filled-checkout-page');
                },
                function onWaitTimeout() {
                    casper.myCapture('checkout-page-GLS-page-timeout');
                    casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
                },
                90000
            );
        }
    });

    casper.then(function() {
        checkoutPage.fillFormCashOnDelivery();
    });

    casper.then(function() {
        casper.wait(20000);
        casper.myCapture('filled-checkout-page');
    });

    casper.then(function() {
        checkoutPage.clickVerifyOrder();
    });

    casper.waitForUrl(/checkout\/\d*\/review/,
        function then() {
            casper.echo('\n' + 'checkout-review-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('checkout-review-page');
        },
        function onWaitTimeout() {
            casper.myCapture('checkout-review-page-timeout');
            casper.echo('\n' + 'checkout-review-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        30000
    );

    casper.then(function() {
        checkoutReviewPage.fillTermsConditions();
    });

    casper.then(function() {
        checkoutReviewPage.clickPay();
    });

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
        casper.clear();
        phantom.clearCookies();
        phantom.page.clearMemoryCache();
        casper.test.done();
    });

});
