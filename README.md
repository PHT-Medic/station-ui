# Station UI 🍭

[![main](https://github.com/PHT-Medic/station-ui/actions/workflows/main.yml/badge.svg)](https://github.com/PHT-Medic/station-ui/actions/workflows/main.yml)
[![Build image](https://github.com/PHT-Medic/station-ui/actions/workflows/build.yml/badge.svg)](https://github.com/PHT-Medic/station-ui/actions/workflows/build.yml)

This repository contains the station ui application of the Personal Health Train.

**Table of Contents**

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
    - [Production](#production)
    - [Development](#development)

## Installation

```shell
git clone https://github.com/PHT-Medic/station-ui
cd station-ui
npm install
```

## Configuration
The following settings need to be added to the environment file `.env` in the root directory.
```
RESOURCE_API_URL=http://localhost:8080
AUTH_API_URL=http://localhost:3010
CENTRAL_API_URL=http://localhost:3002
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
