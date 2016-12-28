casper.test.begin('Test for buy', function suite(test) {
	casper.start(siteConfig.siteURL, function() {
		casper.myCapture('front-page');
		test.assertExists('#block-terracotta-terracotta-bestsellers');
	});

	casper.thenOpen (siteConfig.flowerStandsURL, function() {
		this.echo('Page: ' + this.getTitle() + siteConfig.flowerStandsURL);
		casper.myCapture('flowerStands-page');
		casper.echo(casper.getCurrentUrl());
		test.assertExists('h1.page-header');
		test.assertSelectorHasText('h1.page-header', 'Virágtartók');
	});

	casper.thenOpen (siteConfig.clayPotsURL, function() {
		this.echo('Page: ' + this.getTitle() + siteConfig.clayPotsURL);
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
		casper.echo(this.getCurrentUrl());
		casper.myCapture('Cart-page');
	});

	casper.then(function() {
		this.clickLabel('Fizetés', 'button');
	});

	casper.waitFor(function check() {
		//return this.getCurrentUrl() != siteConfig.checkoutURL;
		var currURL = this.getCurrentUrl();
		return currURL.startsWith(siteConfig.checkoutURL) != true;
	}, function then() {
		casper.echo(this.getCurrentUrl());
		casper.myCapture('Checkout-page');
	});

	casper.run(function() {
		casper.test.done();
	});

});
