var siteConfig = require('../site.config.js');

casper.echo("I'm the pre." + siteConfig.flowerStandsURL);

casper.test.done();


