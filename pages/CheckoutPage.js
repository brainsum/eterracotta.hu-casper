function CheckoutPage() {

    this.checkPage = function () {
        casper.then(function () {
            casper.test.assertExists('#edit-cart-contents');
            casper.test.assertSelectorHasText('h1.page-header', 'Fizetés');
            casper.test.assertExists('.panel-heading');
            casper.test.assertSelectorHasText('.panel-title.fieldset-legend', 'Kosár tartalma');
            casper.test.assertExists('#commerce-checkout-form-checkout');
        });
    };

    this.fillForm = function (data) {
        casper.then(function () {
            this.fill('form#commerce-checkout-form-checkout', {
                'account[login][mail]': data[0],
                'customer_profile_shipping[commerce_customer_address][und][0][name_line]': data[1],
                'customer_profile_shipping[commerce_customer_address][und][0][country]': data[2],
                'customer_profile_shipping[commerce_customer_address][und][0][postal_code]': data[3],
                'customer_profile_shipping[commerce_customer_address][und][0][locality]': data[4],
                'customer_profile_shipping[commerce_customer_address][und][0][thoroughfare]': data[5],
                'customer_profile_shipping[commerce_customer_address][und][0][phone_number]': data[6]
            });
        });
    }

    this.fillFormRemark = function (data) {
        casper.then(function () {
            this.fill('form#commerce-checkout-form-checkout', {
                'commerce_fieldgroup_pane__group_remark[field_remark][und][0][value]': data
            });
        });
    }

    this.fillFormOrderPerson = function (person, date) {
        casper.then(function () {
            this.fill('form#commerce-checkout-form-checkout', {
                'customer_profile_shipping[field_operator_name][und][0][value]': person,
                'customer_profile_shipping[field_order_delivery_date][und][0][value][date]': date
            });
        });
    }

    this.fillFormCashOnDelivery = function () {
        casper.then(function () {
            this.fill('form#commerce-checkout-form-checkout', {
                'commerce_payment[payment_method]': 'commerce_cod|commerce_payment_commerce_cod'
            });
        });
    }

    this.fillGlsPoint = function (gls_point) {
        casper.then(function () {
            this.fill('form#commerce-checkout-form-checkout', {
                'commerce_shipping[shipping_service]': gls_point//'gls_pont_over_10000'//'gls_pont'
            });
        });
    }

    this.selectGlsPoint = function () {
        casper.then(function () {
            //this.click('#1051-NOGROUPGRP');
            this.click('#psitems-canvas > div');
        });
    };

    this.clickVerifyOrder = function () {
        casper.then(function () {
            casper.test.assertExists('#edit-continue');
            this.clickLabel('Rendelés áttekintése', 'button');
        });
    };

}

module.exports = CheckoutPage;
