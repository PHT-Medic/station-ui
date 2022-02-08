# Station UI 🏥

[![main](https://github.com/PHT-Medic/station-ui/actions/workflows/main.yml/badge.svg)](https://github.com/PHT-Medic/station-ui/actions/workflows/main.yml)
[![Build image](https://github.com/PHT-Medic/station-ui/actions/workflows/build.yml/badge.svg)](https://github.com/PHT-Medic/station-ui/actions/workflows/build.yml)

This repository contains all packages of the station ui of the Personal Health Train.

**Table of Contents**

- [Installation](#installation)
- [Configuration](#configuration)
- [Packages](#packages)
- [Usage](#usage)

## Installation & Build

```shell
git clone https://github.com/PHT-Medic/station-ui
cd station-ui
```

To start a package (frontend, backend), `nodejs` must be installed on the host machine.
Nodejs is also required to install all dependencies, with the following command.

```shell
$ npm i
```

Build all packages.

```shell
$ npm run build
```

## Configuration
Read the `Readme.md` in each package directory and configure each package individually.

### @personalhealthtrain/station-ui-app 🍭

This repository contains the frontend application.

### @personalhealthtrain/station-ui-server 🌠

This repository contains the backend application with REST API, aggregators, components and many more.

## Usage
Start the app (frontend) & server (backend) in a single terminal window (or as background process) with the following command:
```shell
$ npm run server
```

```shell
$ npm run app
```
