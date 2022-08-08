# Station UI - App 🍭

[![main](https://github.com/PHT-Medic/station-ui/actions/workflows/main.yml/badge.svg)](https://github.com/PHT-Medic/station-ui/actions/workflows/main.yml)
[![Build image](https://github.com/PHT-Medic/station-ui/actions/workflows/build.yml/badge.svg)](https://github.com/PHT-Medic/station-ui/actions/workflows/build.yml)

This repository contains the station ui application of the Personal Health Train.
It communicates with some APIs of the PHT and need therefore to be configured properly, like described
in the following sections.

## Configuration
The following settings need to be added to the environment file `.env` in the root directory.
```
STATION_API_URL=http://localhost:8080
AUTH_API_URL=http://localhost:3010
API_URL=http://localhost:3002
```

## Usage

### Production

``` bash
# build application for production 🛠
npm run build

# run application ⚔
npm run start
```

### Development

``` bash
# serve application on the fly 🔥
npm run dev
````
