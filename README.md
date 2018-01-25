## Terracotta - functional tests

This folder contains casperjs (http://casperjs.org/) based functional tests.

## Intallation for Linux

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash

nvm ls-remote

nvm install 6.9.1

nvm use 6.9.1

npm install -g npm

echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

npm install -g phantomjs

npm install -g casperjs

npm install -g backstopjs

npm install -g nightwatch

## Configuration

cd configs
cp site-user.config.default.js site-user.config.js
cp user.config.default.js user.config.js

In the files: site-user.config.js, user.config.js and site.config.js - replace the value(s) for your environment.

## Run

The test can be run with the bash local-test.sh command with proper parameters.
There are two test files in the tests folder: buy_test.js and buy_test_PayPal.js.
In the local-test.sh file can be set one of that two test.

To run buy_test.js:

  bash local-test.sh anonym home(bash local-test.sh anonym or bash local-test.sh) - Test for shopping process with anonymous user
  bash local-test.sh auth home (bash local-test.sh auth) - Test for shopping process with authenticated user
  bash local-test.sh anonym gls - Test for shopping process with anonymous user selecting a GLS Point
  bash local-test.sh auth gls - Test for shopping process with authenticated user selecting a GLS Point

To run buy_test_PayPal.js:

  bash local-test.sh

## Debug

The tests are taking screenshots, the screenshots from the last running are stored in the screenshots folder.

