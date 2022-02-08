#!/bin/bash

#
# Copyright (c) 2021-2021.
# Author Peter Placzek (tada5hi)
# For the full copyright and license information,
# view the LICENSE file that was distributed with this source code.
#

set -e

BASE_DIR=/usr/src/project

cd "${BASE_DIR}"

case "${1}" in
    server) PACKAGE=server;;
    app) PACKAGE=app;;
    cli) PACKAGE=cli;;
    *) echo "Unknown package: ${1}";;
esac

shift

if [[ -z "${PACKAGE}" ]]; then
    printf 'Usage:\n'
    printf '  server <command>\n    Start or run the server in dev mode.\n'
    printf '  app <command>\n    Start or run the app in dev mode.\n'
    printf '  cli <command>\n    Run a CLI command.\n'
    exit 0
fi

case "${PACKAGE}" in
    server)
        exec npm run "$1" --workspace=packages/server
        ;;
    app)
        export NUXT_HOST=0.0.0.0
        export NUXT_PORT=3000
        exec npm run "$1" --workspace=packages/app
        ;;
    cli)
        exec npm run cli --workspace=packages/server -- "$@"
        ;;
esac


