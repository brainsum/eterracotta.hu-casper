var fs = require('fs');

casper.test.begin('Test for buy', function suite(test) {
    /*casper.start();
    //casper.clear();
    phantom.clearCookies();
    //phantom.page.clearMemoryCache();
    casper.thenOpen(siteConfig.siteURL, function() {
        test.assertExists('#block-terracotta-terracotta-bestsellers');
        casper.myCapture('front-page');
    });*/

    casper.start(siteConfig.siteURL, function() {
        //phantom.clearCookies();
        //casper.clear();
        test.assertExists('#block-terracotta-terracotta-bestsellers');
        casper.myCapture('front-page');
    });

    casper.thenOpen(siteConfig.flowerStandsURL, function() {
        // casper.echo('Page: ' + casper.getTitle() + ' ' + siteConfig.flowerStandsURL, 'TRACE');
        // casper.echo('\n' + 'checkout-Url: ' + casper.getCurrentUrl(), 'TRACE');
        test.assertExists('h1.page-header');
        test.assertSelectorHasText('h1.page-header', 'Virágtartók');
        casper.myCapture('flowerStands-page');
    });

    casper.thenOpen(siteConfig.clayPotsURL, function() {
        // casper.echo('Page: ' + casper.getTitle() + ' ' + siteConfig.clayPotsURL, 'TRACE');
        test.assertExists('h1.page-title');
        test.assertSelectorHasText('h1.page-title', 'Agyagcserép');
        casper.myCapture('clayPots-page');
    });

    casper.then(function() {
        casper.clickLabel('Kosárba', 'button');
    });

    casper.waitForSelector('.alert.alert-block.alert-success.messages.status', function() {
        test.assertExists('.alert.alert-block.alert-success.messages.status');
        test.assertTextExists('bekerült a', 'The selected item gone to the shopping cart.');
        casper.myCapture('clayPots-addToCart-page');
    });

    casper.waitForSelector('#cart-popup', function() {
        test.assertExists('.line-item-summary-view-cart.first');
        casper.clickLabel('Kosár megtekintése', 'a');
    });

    casper.then(function() {
        // casper.echo('Page: ' + casper.getTitle(), 'TRACE');
        test.assertExists('h1.page-header');
        test.assertSelectorHasText('h1.page-header', 'Kosár');
        casper.myCapture('cart-page');
    });

    casper.then(function() {
        casper.clickLabel('Fizetés', 'button');
    });

    casper.waitForSelector('#edit-cart-contents', function() {
        // casper.echo('\n' + 'checkout-Url: ' + casper.getCurrentUrl(), 'TRACE');
        test.assertSelectorHasText('h1.page-header', 'Fizetés');
        test.assertExists('.panel-heading');
        test.assertSelectorHasText('.panel-title.fieldset-legend', 'Kosár tartalma');
        casper.myCapture('checkout-page');
    });

    casper.then(function() {
        test.assertExists('#commerce-checkout-form-checkout');
        casper.fill('form#commerce-checkout-form-checkout', {
            'account[login][mail]': 'test@yahoo.com',
            'customer_profile_shipping[commerce_customer_address][und][0][name_line]': 'Test Pers',
            'customer_profile_shipping[commerce_customer_address][und][0][postal_code]': '4000',
            'customer_profile_shipping[commerce_customer_address][und][0][locality]': 'Sepsiszentgyörgy',
            'customer_profile_shipping[commerce_customer_address][und][0][thoroughfare]': 'Grigore Bălan',
            'customer_profile_shipping[commerce_customer_address][und][0][phone_number]': '0757000999',
            'commerce_fieldgroup_pane__group_remark[field_remark][und][0][value]': 'Ez csak egy teszt rendelés!'
        });
        casper.myCapture('filled-checkout-page');
    });

    casper.then(function() {
        casper.clickLabel('Folytatás a következő lépéssel', 'button');
        casper.options.timeout = 30000;
        casper.options.waitTimeout = 30000;
    });

    casper.waitForSelector('.checkout-help',
        function then() {
            // casper.echo('\n' + 'checkout-review Url: ' + casper.getCurrentUrl(), 'TRACE');
            test.assertSelectorHasText('h1.page-header', 'Rendelés áttekintése');
            test.assertSelectorHasText('.checkout-help', 'A vásárlás befejezése előtt kérjük ellenőrizze rendelését!');
            casper.myCapture('checkout-review-page');
        }, 
        function onWaitTimeout() {
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        30000
    );

    casper.then(function() {
        casper.clickLabel('Folytatás a következő lépéssel', 'button');
    });

    casper.waitForSelector('a#cancelLink',
        function then() {
            // casper.echo('\n' + 'PayPal-Url: ' + casper.getCurrentUrl(), 'TRACE');
            test.assertExists('h1.alpha.ng-binding');
            casper.myCapture('payPal-page');
        }, 
        function onWaitTimeout() {
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        30000
    );

    casper.then(function() {
        casper.clickLabel('Log In', 'a');
    });

    casper.waitForSelector('#injectedUnifiedLogin',
        function then() {
            // casper.echo('\n' + 'PayPal-Login-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('payPal-login-page');
        },
        function onWaitTimeout() {
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        30000
    );

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
        casper.myCapture('paypal-login-iframe-page');
        test.assertExists('#email');
        test.assertExists('form.proceed.maskable');
        casper.fill('form.proceed', {
            'login_email': userConfig.PayPalEmail,
            'login_password': userConfig.PayPalPassw
        });
        casper.myCapture('payPal-filled-login-iframe-page');
        test.assertExists('#btnLogin');
        casper.clickLabel('Log In', 'button');
    });

    var isFirst = 0;
    casper.waitForSelector('#loadLogin',
        function then() {
            casper.echo('\n' + 'PayPal-Login-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('first-payPal-btnLogin_click-page');
            isFirst = 1;
        },
        function onWaitTimeout() {
            //casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
            casper.myCapture('payPal-btnLogin_click-page');
        },
        30000
    );

    if (isFirst === 1) {
        casper.then(function() {
            //fs.write('casperlogs/logfile.html', casper.getHTML(), 'w');
            test.assertExists('#loadLogin');
            casper.click('#loadLogin');
        });
        
        casper.waitForSelector('#submitLogin',
            function then() {
                casper.echo('\n' + 'PayPal-Login2-Url: ' + casper.getCurrentUrl(), 'TRACE');
                //casper.wait(1000);
                casper.myCapture('payPal-login2-page');
            },
            function onWaitTimeout() {
                casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
            },
            30000
        );

        casper.then(function() {
            //casper.wait(10000);
            //fs.write('casperlogs/logfile.html', casper.getHTML(), 'w');
            casper.fill('form#parentForm', {
                'login_password': userConfig.PayPalPassw
            });
            casper.myCapture('payPal-submitLogin_filledpw_click-page');
            casper.click('#submitLogin');
        });

        casper.then(function() {
            casper.echo('\n' + 'PayPal-Logined2-Url: ' + casper.getCurrentUrl(), 'TRACE');
            //casper.wait(60000);
            casper.myCapture('payPal-submitLogin_click-page');
        });
    }

    casper.waitForSelector('#confirmButtonTop',
        function then() {
            // casper.echo('\n' + 'PayPal-Logined-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('payPal-btnLogin_click-page');
        },
        function onWaitTimeout() {
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        30000
    );

    casper.then(function() {
        casper.wait(5000);
        // casper.echo('\n' + 'PayPal-Confirmation-Url: ' + casper.getCurrentUrl(), 'TRACE');
        test.assertExists('#confirmButtonTop');
        casper.click('#confirmButtonTop');
        casper.myCapture('payPal-confirmButtonTop_click-page');
    });

    casper.waitForSelector('.checkout-completion-message',
        function then() {
            // casper.echo('\n' + 'checkout-complete Url: ' + casper.getCurrentUrl(), 'TRACE');
            test.assertSelectorHasText('h1.page-header', 'A rendelési eljárás befejeződött');
            casper.myCapture('checkout-complete-page');
        },
        function onWaitTimeout() {
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        30000
    );
    
    casper.run(function() {
        casper.clear();
        phantom.clearCookies();
        phantom.page.clearMemoryCache();
        casper.test.done();
    });

});
