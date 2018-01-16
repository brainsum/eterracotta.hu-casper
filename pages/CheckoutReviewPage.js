function CheckoutReviewPage() {

    this.checkPage = function () {
        casper.then(function () {
            casper.test.assertSelectorHasText('h1.page-header', 'Rendelés áttekintése');
            casper.test.assertSelectorHasText('.checkout-help', 'A vásárlás befejezése előtt kérjük ellenőrizze rendelését!');
        });
    };

    this.fillTermsConditions = function (data) {
        casper.then(function () {
           this.fill('form#commerce-checkout-form-review', {
                'terms_conditions[commerce_agree_terms_pane_field]': 1
            });
        });
    }

    this.clickPay = function () {
        casper.then(function () {
            this.clickLabel('Fizetés', 'button');
        });
    };

}

module.exports = CheckoutReviewPage;
