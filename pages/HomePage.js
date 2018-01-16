function HomePage() {

    this.checkPage = function () {
        casper.then(function () {
            casper.test.assertExists('#block-terracotta-terracotta-bestsellers');
            casper.test.assertSelectorHasText('h2.block-title', 'Legkeresettebb termékek');
        });
    };

    // this.selectFlowerStands = function () {
    //     casper.then(function () {
    //         //this.clickLabel("Virágtartók", 'a');
    //         //casper.click('ul.tb-megamenu-nav.nav.level-0.items-8:nth-child(1) li a', 'Second tab clicked (Edit)');

    //         this.click('li.tb-megamenu-item.level-1.mega.mega-align-left.dropdown a', 'Second tab clicked (Edit)');
    //         //li.tb-megamenu-nav.nav.level-0.items-8
    //         casper.myCapture('flowerStands-page');
    //     });
    // };

}

module.exports = HomePage;
