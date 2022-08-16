#!/bin/bash

#
# Copyright (c) 2021-2021.
# Author Peter Placzek (tada5hi)
# For the full copyright and license information,
# view the LICENSE file that was distributed with this source code.
#

set -e

BASE_DIR=/usr/src/app

cd "${BASE_DIR}"

export NUXT_HOST=0.0.0.0
export NUXT_PORT=3000

exec npm run "$@"


