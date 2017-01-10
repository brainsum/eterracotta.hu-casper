casper.test.begin('Test for buy', function suite(test) {
    casper.start(siteConfig.siteURL, function() {
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
            'customer_profile_shipping[commerce_customer_address][und][0][country]': 'Románia',
            'customer_profile_shipping[commerce_customer_address][und][0][postal_code]': '4000',
            'customer_profile_shipping[commerce_customer_address][und][0][locality]': 'Sepsiszentgyörgy',
            'customer_profile_shipping[commerce_customer_address][und][0][thoroughfare]': 'Grigore Bălan',
            'customer_profile_shipping[commerce_customer_address][und][0][phone_number]': '0757000999',
            'commerce_fieldgroup_pane__group_remark[field_remark][und][0][value]': 'Ez csak egy teszt rendelés!',
            'commerce_payment[payment_method]': 'commerce_cod|commerce_payment_commerce_cod'
        });
        casper.wait(5000);
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

    casper.waitForSelector('.checkout-completion-message',
        function then() {
            //casper.echo('\n' + 'checkout-complete Url: ' + casper.getCurrentUrl(), 'TRACE');
            test.assertSelectorHasText('h1.page-header', 'A rendelési eljárás befejeződött');
            casper.myCapture('checkout-complete-page');
            },
        function onWaitTimeout() {
            casper.echo("I can't take my screenshot - timeout.", 'TRACE').exit();
        },
        30000
    );

    casper.run(function() {
        casper.test.done();
    });

});
