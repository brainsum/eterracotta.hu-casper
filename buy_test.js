casper.test.begin('Test for buy', function suite(test) {
	casper.start(siteConfig.siteURL, function() {
		casper.myCapture('front-page');
		test.assertExists('#block-terracotta-terracotta-bestsellers');
	});

	casper.thenOpen (siteConfig.flowerStandsURL, function() {
		this.echo('Page: ' + this.getTitle() + siteConfig.flowerStandsURL);
		casper.myCapture('flowerStands-page');
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

	casper.then(function() {
		casper.myCapture('clayPots-addToCart-page');
		test.assertExists('#main-content');
		test.assertExists('.alert.alert-block.alert-success.messages.status');
		test.assertTextExists('bekerült a', 'The selected item gone to the shopping cart.');
	});

	casper.run(function() {
		casper.test.done();
	});
});
