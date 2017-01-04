casper.test.begin('Test for buy', function suite(test) {
    casper.start(siteConfig.siteURL, function() {
        casper.myCapture('front-page');
        test.assertExists('#block-terracotta-terracotta-bestsellers');
    });

    casper.thenOpen(siteConfig.flowerStandsURL, function() {
        // casper.echo('Page: ' + casper.getTitle() + ' ' + siteConfig.flowerStandsURL);
        casper.echo('\n' + 'checkout-Url: ' + casper.getCurrentUrl());
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
    });

    casper.waitForSelector('.merchantName.ng-binding.ng-scope',
        function then() {
            test.assertExists('h1.alpha.ng-binding');
            //test.assertSelectorHasText('h1.alpha.ng-binding', 'PayPal Guest Checkout');
            casper.echo('\n' + 'PayPal-Url: ' + casper.getCurrentUrl());
            casper.myCapture('payPal-page');
        }, 
        function timeout() {
            casper.echo("I can't take my screenshot - timeout.").exit();
        },
        55000
    );

    casper.then( function() {
        casper.clickLabel('Log In', 'a');
        casper.myCapture('payPal-button_click-page');
    });

    casper.waitForSelector('#email',
        function then() {
            casper.myCapture('payPal-login-page');
            casper.echo('\n' + 'PayPal-Login-Url: ' + casper.getCurrentUrl());
            //test.assertSelectorHasText('h1.alpha.ng-binding', 'Pay with PayPal');
            casper.echo('\n' + 'PayPal-Login-Url: ' + casper.getCurrentUrl());
            casper.myCapture('payPal-login-page'); 
        },
        function timeout() {
            casper.echo("I can't take my screenshot - timeout.").exit();
        },
        55000
    );

    /*casper.waitForSelector('.checkout-completion-message', function then() {
        test.assertSelectorHasText('h1.page-header', 'A rendelési eljárás befejeződött');
        // casper.echo('\n' + 'checkout-complete Url: ' + casper.getCurrentUrl());
        casper.myCapture('checkout-complete-page');
    });*/

    casper.run(function() {
        casper.test.done();
    });

});
