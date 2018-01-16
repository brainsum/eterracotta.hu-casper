function LoginPage() {

    this.checkPage = function () {
        casper.then(function () {
            casper.test.assertExists('#user-login');
        });
    };

    this.fillForm = function (username, password) {
        casper.then(function () {
            this.fill('form#user-login', {
                'name': username,
                'pass': password
            }, false);
        });
    };

    this.submitForm = function () {
        casper.then(function () {
            this.clickLabel('Bejelentkezés', 'button');
        });
    };

}

module.exports = LoginPage;
