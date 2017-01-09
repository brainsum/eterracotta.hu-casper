#!/usr/bin/env sh

casperjs test tests/buy_test_PayPal.js \
    --pre=pre.js \
    --ignore-ssl-errors=true \
    --ssl-protocol=any \
    --web-security=no \
    --fail-fast #\
   # --debug=yes

# sudo ip addr show docker0
