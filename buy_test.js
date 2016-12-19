casper.test.begin('Test for buy', function suite(test) {
  casper.start("http://www.eterracotta.hu/", function() {
  test.assertExists('#block-terracotta-terracotta-bestsellers');
	
  });
	
	casper.thenOpen ('http://www.eterracotta.hu/kategoria/viragtartok',function() {
		this.echo('Page: ' + this.getTitle());
		test.assertExists('h1.page-header');
		test.assertSelectorHasText('h1.page-header', 'Virágtartók');
	});
	
	casper.thenOpen ('http://www.eterracotta.hu/agyagcserep',function() {
		this.echo('Page: ' + this.getTitle());
		test.assertExists('h1.page-title');
		test.assertSelectorHasText('h1.page-title', 'Agyagcserép');
	});

	casper.then(function() {
		this.clickLabel('Kosárba', 'button');
		test.assertExists('#alert.alert-block.alert-success.messages.status');
    test.assertTextExists('bekerült a kosárba.', 'The selected item gone to the shopping cart.');
	});

	
  casper.run(function() {
    test.done();
  });
});
