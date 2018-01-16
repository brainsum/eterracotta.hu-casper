function FlowerStandsPage() {

    this.checkPage = function () {
        casper.then(function () {
            casper.test.assertExists('h1.page-header');
            casper.test.assertSelectorHasText('h1.page-header', 'Virágtartók');
        });
    };

    this.selectClayPot = function () {
        casper.then(function () {
            this.clickLabel('Agyagcserép', 'a');
        });
    };

}

module.exports = FlowerStandsPage;
