#!/usr/bin/env sh

casperjs test buy_test.js \
       --pre=pre.js \
       --ignore-ssl-errors=true \
       --ssl-protocol=any \
       --fail-fast
      # --debug=yes

# sudo ip addr show docker0
