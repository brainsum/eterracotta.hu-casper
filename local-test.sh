#!/usr/bin/env sh

casperjs test tests/ \
    --pre=pre.js \
    --ignore-ssl-errors=true \
    --ssl-protocol=any \
    --fail-fast
   # --debug=yes

# sudo ip addr show docker0
