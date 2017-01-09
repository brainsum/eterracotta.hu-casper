var fs = require('fs');

casper.test.begin('Test for buy', function suite(test) {
    casper.start(siteConfig.siteURL, function() {
        casper.myCapture('front-page');
        test.assertExists('#block-terracotta-terracotta-bestsellers');
    });

    casper.thenOpen(siteConfig.flowerStandsURL, function() {
        // casper.echo('Page: ' + casper.getTitle() + ' ' + siteConfig.flowerStandsURL);
        casper.echo('\n' + 'checkout-Url: ' + casper.getCurrentUrl(), 'TRACE');
        casper.myCapture('flowerStands-page1');
        test.assertExists('h1.page-header');
        test.assertSelectorHasText('h1.page-header', 'Virágtartók');
    });

    casper.thenOpen(siteConfig.clayPotsURL, function() {
        // casper.echo('Page: ' + casper.getTitle() + ' ' + siteConfig.clayPotsURL);
        casper.myCapture('clayPots-page');
        test.assertExists('h1.page-title');
        test.assertSelectorHasText('h1.page-title', 'Agyagcserép');
    });

    casper.then(function() {
        casper.clickLabel('Kosárba', 'button');
    });

    casper.waitForSelector('.alert.alert-block.alert-success.messages.status', function() {
        casper.myCapture('clayPots-addToCart-page');
        test.assertExists('.alert.alert-block.alert-success.messages.status');
        test.assertTextExists('bekerült a', 'The selected item gone to the shopping cart.');
    });

    casper.waitForSelector('#cart-popup', function() {
        test.assertExists('.line-item-summary-view-cart.first');
        casper.clickLabel('Kosár megtekintése', 'a');
    });

    casper.then(function() {
        // casper.echo('Page: ' + casper.getTitle());
        casper.myCapture('cart-page');
        test.assertExists('h1.page-header');
        test.assertSelectorHasText('h1.page-header', 'Kosár');
    });

    casper.then(function() {
        casper.clickLabel('Fizetés', 'button');
    });

    casper.waitForSelector('#edit-cart-contents', function() {
        test.assertSelectorHasText('h1.page-header', 'Fizetés');
        test.assertExists('.panel-heading');
        test.assertSelectorHasText('.panel-title.fieldset-legend', 'Kosár tartalma');
        // casper.echo('\n' + 'checkout-Url: ' + casper.getCurrentUrl());
        casper.myCapture('checkout-page');
    });

    casper.then(function() {
        test.assertExists('#commerce-checkout-form-checkout');
        casper.fill('form#commerce-checkout-form-checkout', {
            'account[login][mail]': 'test@yahoo.com',
            'customer_profile_shipping[commerce_customer_address][und][0][name_line]': 'Test Pers',
            'customer_profile_shipping[commerce_customer_address][und][0][country]': 'Románia',
            'customer_profile_shipping[commerce_customer_address][und][0][postal_code]': '4000',
            'customer_profile_shipping[commerce_customer_address][und][0][locality]': 'Sepsiszentgyörgy',
            'customer_profile_shipping[commerce_customer_address][und][0][thoroughfare]': 'Grigore Bălan',
            'customer_profile_shipping[commerce_customer_address][und][0][phone_number]': '0757000999',
            'commerce_fieldgroup_pane__group_remark[field_remark][und][0][value]': 'Ez csak egy teszt rendelés!',
            //'commerce_payment[payment_method]': 'commerce_cod|commerce_payment_commerce_cod'
            'commerce_payment[payment_method]': 'paypal_ec|commerce_payment_paypal_ec'
        });
        casper.myCapture('filled-checkout-page');
    });

    casper.then(function() {
        casper.clickLabel('Folytatás a következő lépéssel', 'button');
        // casper.echo('\n' + 'checkout-Url: ' + casper.getCurrentUrl());
        casper.myCapture('filled-checkout-button_click-page');
        casper.options.timeout = 20000;
        casper.options.waitTimeout = 20000;
    });

    casper.waitForSelector('.checkout-help', function() {
        test.assertSelectorHasText('h1.page-header', 'Rendelés áttekintése');
        test.assertSelectorHasText('.checkout-help', 'A vásárlás befejezése előtt kérjük ellenőrizze rendelését!');
        // casper.echo('\n' + 'checkout-review Url: ' + casper.getCurrentUrl());
        casper.myCapture('checkout-review-page');
    });

    casper.then(function() {
        casper.clickLabel('Folytatás a következő lépéssel', 'button');
        casper.myCapture('checkout-review-button_click-page');
        casper.options.timeout = 30000;
        casper.options.waitTimeout = 30000;
    });

    //casper.waitForSelector('.merchantName.ng-binding.ng-scope',
    casper.waitForSelector('a#cancelLink',
        function then() {
            test.assertExists('h1.alpha.ng-binding');
            casper.echo('timeot: ' + casper.options.waitTimeout, 'TRACE');
            //test.assertSelectorHasText('h1.alpha.ng-binding', 'PayPal Guest Checkout');
            casper.echo('\n' + 'PayPal-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('payPal-page');
        }, 
        function onWaitTimeout() {
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        30000
    );

    casper.then(function() {
        casper.clickLabel('Log In', 'a');
        casper.myCapture('payPal-button_click-page');
    });

    //casper.waitForSelector('#email',
    //casper.waitForSelector('form.proceed maskable',
    casper.waitForSelector('#injectedUnifiedLogin',
        function then() {
            casper.myCapture('payPal-login-page');
            //test.assertSelectorHasText('h1.alpha.ng-binding', 'Pay with PayPal');
            casper.echo('\n' + 'PayPal-Login-Url: ' + casper.getCurrentUrl(), 'TRACE');
            casper.myCapture('payPal-login-page');
        },
        function onWaitTimeout() {
            casper.myCapture('payPal-login-page-timeout');
            //casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
            casper.echo("I can't take my screenshot - timeout.", 'TRACE');
            //casper.echo(casper.getHTML());
            //fs.write('logfile.html', 'log\n', 'w');
            fs.write('casperlogs/logfile.html', casper.getHTML(), 'w');
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
        casper.myCapture('paypal-btnLogin-iframe-page');
        test.assertExists('#email');
        test.assertExists('form.proceed.maskable');
        casper.fill('form.proceed', {
            'login_email': userConfig.PayPalEmail,
            'login_password': userConfig.PayPalPassw
        });
        casper.myCapture('payPal-filled-login-page');
        test.assertExists('#btnLogin');
        casper.clickLabel('Log In', 'button');
    })
    
    casper.waitForSelector('#loadLogin',
        function then() {
            casper.echo('\n' + 'PayPal-Logined-Url: ' + casper.getCurrentUrl(), 'TRACE');
            //casper.wait(1000);
            casper.myCapture('payPal-after-btnLogin-page');
        },
        function onWaitTimeout() {
            //casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
            casper.echo("I can't take my screenshot - timeout.", 'TRACE');
            casper.myCapture('payPal-after-btnLogin-page-timeout');
        },
        30000       
    );

    casper.then(function() {
        fs.write('casperlogs/logfile.html', casper.getHTML(), 'w');
                                
        //test.assertTextExists('Pay with my PayPal account', 'Pay with my PayPal account - not found');
        test.assertExists('#loadLogin');
        
        casper.click('#loadLogin');
        //this.wait(10000);
        //casper.echo('\n' + 'PayPal-Login-Url: ' + casper.getCurrentUrl(), 'TRACE');
        //this.wait(10000);
        //casper.myCapture('payPal-btnLogin_button-page11111');
        //test.assertTextExists('Log In', 'LogIn not found');
        //test.assertExists('actions.button#btnLogin');
        //test.assertExists('.button.actionContinue.scTrack');
        
        
    });

    /*casper.then(function() {
        casper.wait(60000);
        casper.echo('\n' + 'PayPal-Logined-Url: ' + casper.getCurrentUrl(), 'TRACE');
        casper.myCapture('payPal-filled-page');
        
    });*/
    casper.waitForSelector('#submitLogin',
        function then() {
            casper.echo('\n' + 'PayPal-Login2-Url: ' + casper.getCurrentUrl(), 'TRACE');
            //casper.wait(1000);
            casper.myCapture('payPal-Login2-page');
        },
        function onWaitTimeout() {
            //casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
            casper.echo("I can't take my screenshot - timeout.", 'TRACE');
            casper.myCapture('payPal-Login2-page-timeout');
        },
        30000       
    );

    casper.then(function() {
        //casper.wait(10000);
        casper.echo('\n' + 'PayPal-Logined-Url: ' + casper.getCurrentUrl(), 'TRACE');
        casper.myCapture('payPal-filled-page1');
        fs.write('casperlogs/logfile.html', casper.getHTML(), 'w');
        casper.click('#submitLogin');
    });

    casper.then(function() {
        casper.echo('\n' + 'PayPal-Login-Url: ' + casper.getCurrentUrl(), 'TRACE');
        casper.myCapture('payPal-submitLogin_click-page');
        //test.assertTextExists('Log In', 'LogIn not found');
        //test.assertExists('actions.button#btnLogin');
        //test.assertExists('.button.actionContinue.scTrack');
        //test.assertExists('#btnLogin');
        casper.wait(60000);
        casper.myCapture('payPal-btnLogin_button-page');
    });

    casper.then(function() {
        casper.echo('\n' + 'PayPal-Login-Url: ' + casper.getCurrentUrl(), 'TRACE');
        casper.myCapture('payPal-submitLogin_click-page1');
        //test.assertTextExists('Log In', 'LogIn not found');
        //test.assertExists('actions.button#btnLogin');
        //test.assertExists('.button.actionContinue.scTrack');
        //test.assertExists('#btnLogin');
        casper.wait(60000);
        casper.myCapture('payPal-btnLogin_button-page12');
    });

    // van-e login gomb? Ha igen, akkor fill + login
    // @NOTE: buyer ("personal") sandbox accounttal
    // egyébként login utáni cuccok

    /*casper.waitForSelector('.checkout-completion-message', function then() {
        test.assertSelectorHasText('h1.page-header', 'A rendelési eljárás befejeződött');
        // casper.echo('\n' + 'checkout-complete Url: ' + casper.getCurrentUrl());
        casper.myCapture('checkout-complete-page');
    });*/

    casper.run(function() {
        casper.test.done();
    });

});
