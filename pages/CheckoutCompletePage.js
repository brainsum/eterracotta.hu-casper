function CheckoutCompletePage() {

    this.checkPage = function () {
        casper.then(function () {
            casper.test.assertSelectorHasText('h1.page-header', 'A rendelési eljárás befejeződött');
        });
    };

}

module.exports = CheckoutCompletePage;
