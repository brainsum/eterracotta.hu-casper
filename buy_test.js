casper.test.begin('Test for buy', function suite(test) {
	casper.start(siteConfig.siteURL, function() {
		test.assertExists('#block-terracotta-terracotta-bestsellers');
	});

	casper.thenOpen (siteConfig.flowerStandsURL, function() {
		this.echo('Page: ' + this.getTitle());
		test.assertExists('h1.page-header');
		test.assertSelectorHasText('h1.page-header', 'Virágtartók');
	});

	casper.thenOpen (siteConfig.clayPotsURL, function() {
		this.echo('Page: ' + this.getTitle() + siteConfig.clayPotsURL);
		test.assertExists('h1.page-title');
		test.assertSelectorHasText('h1.page-title', 'Agyagcserép');
	});

	casper.then(function() {
		this.clickLabel('Kosárba', 'button');
	});

	casper.then(function() {
		test.assertExists('#main-content');
		//test.assertExists('#main-content .alert-block');
		test.assertExists('#main-content .alert-block > h4.element-invisible');
		//test.assertExists('.alert.alert-block.alert-success.messages.status');
		//test.assertTextExists('bekerült a', 'The selected item gone to the shopping cart.');
	});

	casper.run(function() {
		casper.test.done();
	});
});
