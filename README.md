# Station 🏥

[![main](https://github.com/PHT-Medic/station-ui/actions/workflows/main.yml/badge.svg)](https://github.com/PHT-Medic/station-ui/actions/workflows/main.yml)
[![Build image](https://github.com/PHT-Medic/station-ui/actions/workflows/build.yml/badge.svg)](https://github.com/PHT-Medic/station-ui/actions/workflows/build.yml)

This repository contains all packages of the station ui of the Personal Health Train.

**Table of Contents**

- [Configuration](#configuration)
- [Packages](#packages)
- [Usage](#usage)
  - [Docker](#docker)
  - [Local Machine](#local-machine)

## Configuration
Read the `Readme.md` in each package directory and configure each package individually.

## Packages

### @personalhealthtrain/station-ui 🍭

This repository contains the frontend application.

### @personalhealthtrain/station-server 🌠

This package contains the authentication- & authorization-server for the station.

## Usage

### Docker

```shell
docker pull ghcr.io/pht-medic/station-ui:latest
```

Setup backend server (db, rsa key-pair, ...):

```shell
docker run \
  --env ROBOT_SECRET=start123 \
  ghcr.io/pht-medic/station-ui:latest \
  server setup
```

To start the frontend application & backend server with docker, run the following command:

```shell
docker run \
  --env AUTH_API_URL=http://127.0.0.1:3010/ \
  ghcr.io/pht-medic/station-ui:latest \
  app start
```

```shell
docker run \
  ghcr.io/pht-medic/station-ui:latest \
  server start
```

### Local Machine

Setup backend server:

```shell
npm run setup --workspace=packages/server
```

To start the frontend application & backend server locally, run the following command:
```shell
npm run start --workspace=packages/server
```

```shell
npm run dev --workspace=packages/app
```
