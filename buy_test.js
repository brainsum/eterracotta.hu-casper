casper.test.begin('Test for buy', function suite(test) {
	casper.start(siteConfig.siteURL, function() {
		casper.myCapture('front-page');
		test.assertExists('#block-terracotta-terracotta-bestsellers');
	});

	casper.thenOpen (siteConfig.flowerStandsURL, function() {
		this.echo('Page: ' + this.getTitle() + ' ' + siteConfig.flowerStandsURL);
		casper.myCapture('flowerStands-page');
		casper.echo(casper.getCurrentUrl());
		test.assertExists('h1.page-header');
		test.assertSelectorHasText('h1.page-header', 'Virágtartók');
	});

	casper.thenOpen (siteConfig.clayPotsURL, function() {
		this.echo('Page: ' + this.getTitle() + ' ' + siteConfig.clayPotsURL);
		casper.myCapture('clayPots-page');
		test.assertExists('h1.page-title');
		test.assertSelectorHasText('h1.page-title', 'Agyagcserép');
	});

	casper.then(function() {
		this.clickLabel('Kosárba', 'button');
	});

	casper.waitForSelector('.alert.alert-block.alert-success.messages.status', function() {
		casper.myCapture('clayPots-addToCart-page');
		test.assertExists('.alert.alert-block.alert-success.messages.status');
		test.assertTextExists('bekerült a', 'The selected item gone to the shopping cart.');
	});

	casper.waitForSelector('#cart-popup', function() {
		test.assertExists('.line-item-summary-view-cart.first');
		this.clickLabel('Kosár megtekintése', 'a');
	});

	casper.waitFor(function check() {
		return this.getCurrentUrl() != siteConfig.cartURL;
	}, function then() {
		casper.echo('\n' + 'cartUrl: ' + this.getCurrentUrl());
		casper.myCapture('Cart-page');
	});

	casper.then(function() {
		this.clickLabel('Fizetés', 'button');
	});

	casper.waitFor(function check() {
		// return this.getCurrentUrl() != siteConfig.checkoutURL;
		var currURL = this.getCurrentUrl();
		// return currURL.startsWith(siteConfig.checkoutURL) != true;
		return this.getCurrentUrl() == currURL;
	}, function then() {
		casper.echo('\n' + 'checkout Url: ' + this.getCurrentUrl());
		casper.myCapture('Checkout-page');
	});

	casper.then(function() {
		test.assertExists('#commerce-checkout-form-checkout');		
		this.fill('form#commerce-checkout-form-checkout', {
			'account[login][mail]': 'test@yahoo.com',
			'customer_profile_shipping[commerce_customer_address][und][0][name_line]': 'Test Pers',
			'customer_profile_shipping[commerce_customer_address][und][0][country]': 'Románia',
			'customer_profile_shipping[commerce_customer_address][und][0][postal_code]': '4000',
			'customer_profile_shipping[commerce_customer_address][und][0][locality]': 'Sepsiszentgyörgy',
			'customer_profile_shipping[commerce_customer_address][und][0][thoroughfare]': 'Grigore Bălan',
			'customer_profile_shipping[commerce_customer_address][und][0][phone_number]': '0757000999',
			'commerce_payment[payment_method]': 'commerce_cod|commerce_payment_commerce_cod'
			
			
		});
		casper.myCapture('Filled-Checkout-page');
	});

	casper.then(function() {
		casper.myCapture('Filled-Checkout-page1');
		test.assertTextExists('Folytatás a következő lépéssel', 'Gomb');
		this.clickLabel('Folytatás a következő lépéssel', 'button');
	});

	casper.waitFor(function check() {
		var currURL = this.getCurrentUrl() + '/review';
		//casper.echo('Url curr: ' + currURL);
		//casper.echo('Url-this: ' + this.getCurrentUrl());
		return this.getCurrentUrl() != currURL;
	}, function then() {
		casper.echo('\n' + 'checkout-review Url: ' + this.getCurrentUrl());
		casper.myCapture('Checkout-Review-page');
	}, function timeout() { 
		// step to execute if check has failed
    		this.echo("I can't take my screenshot.").exit();
	}, 20000
	);

	casper.then(function() {
		this.clickLabel('Folytatás a következő lépéssel', 'button');		
	});

	casper.then(function() {
		casper.echo('\n' + 'checkout-complete Url: ' + this.getCurrentUrl());
		casper.myCapture('Checkout-Complete-page');
	});

	casper.run(function() {
		casper.test.done();
	});

});
