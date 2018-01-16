function CartPage() {

    this.checkPage = function () {
        casper.then(function () {
            casper.test.assertExists('h1.page-header');
            casper.test.assertSelectorHasText('h1.page-header', 'Kosár');
        });
    };

    this.clickPay = function () {
        casper.then(function () {
            casper.clickLabel('Fizetés', 'button');
        });
    };

}

module.exports = CartPage;
