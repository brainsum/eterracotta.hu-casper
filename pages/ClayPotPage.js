function ClayPotPage() {

    this.checkPage = function () {
        casper.then(function () {
            casper.test.assertExists('h1.page-title');
            casper.test.assertSelectorHasText('h1.page-title', 'Agyagcserép');
        });
    };

    this.addToCart = function () {
        casper.then(function () {
            this.clickLabel('Kosárba', 'button');
        });
    };

    this.viewCart = function () {
        casper.then(function () {
            this.clickLabel('Kosár megtekintése', 'a');
        });
    };

}

module.exports = ClayPotPage;
