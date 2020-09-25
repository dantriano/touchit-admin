[![@coreui angular](https://img.shields.io/badge/@coreui%20-angular-lightgrey.svg?style=flat-square)](https://github.com/coreui/angular)
[![npm package][npm-coreui-badge]][npm-coreui]
![angular](https://img.shields.io/badge/angular-^9.0.0-lightgrey.svg?style=flat-square&logo=angular)  

[npm-coreui-angular]: https://www.npmjs.com/package/@coreui/angular  
[npm-coreui-angular-badge]: https://img.shields.io/npm/v/@coreui/angular.png?style=flat-square  
[npm-coreui-angular-download]: https://img.shields.io/npm/dm/@coreui/angular.svg?style=flat-square  
[npm-coreui]: https://www.npmjs.com/package/@coreui/coreui
[npm-coreui-badge]: https://img.shields.io/npm/v/@coreui/coreui.png?style=flat-square
[npm-coreui-download]: https://img.shields.io/npm/dm/@coreui/coreui.svg?style=flat-square

# Touch It Administration Back-end [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&logo=twitter)](https://twitter.com/dan_triano)

This is a developping program to manage all the information and company structure of the APP Touch it (dev name) wich is used to register the access and schedule of the employees from the companies using our APP.

It is based on Bootstrap 4 and uses
[Angular 2+](https://github.com/coreui/coreui-free-angular-admin-template) as Framework to work and comunicate with the database providing easy and user friendly interfaces to our users.


## Functions

- Employees profiles
- Create/manage locations using Google API to create areas that will be used to geoverify the position of the employees
- Create/manage services to be registered during the work time such as clients visitors, lunch breaks, medical visitors, remote work, etc


## Screens

| Dashboard | Locations |
| --- | --- |
| ![Dashboard](img/dashboard.png?raw=true "Dashboard")
| ![Locations](img/locations.png?raw=true "Locations") |

#### Prerequisites
Before you begin, make sure your development environment includes `Node.js®`, `Graphql server` and an `npm` package manager and is up the [Touch it Graphql server](https://gitlab.com/dantriano/touchit_graphql) on port 5000.

###### Node.js
Angular 9 requires `Node.js` version 10.13 or later.

- To check your version, run `node -v` in a terminal/console window.
- To get `Node.js`, go to [nodejs.org](https://nodejs.org/).

###### Angular CLI
Install the Angular CLI globally using a terminal/console window.
```bash
npm install -g @angular/cli
```

##### Update to Angular 9
Angular 9 requires `Node.js` version 10.x or newer    
Update guide - see: [https://update.angular.io](https://update.angular.io)

## Installation

### Clone repo

``` bash
# clone the repo
$ git clone https://gitlab.com/dantriano/touchit_admin.git touchit_admin

# go into app's directory
$ cd touchit_admin

# install app's dependencies
$ npm install
```

## Usage

``` bash
# serve with hot reload at localhost:4200.
$ ng serve

# build for production with minification
$ ng build
```

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
free-angular-admin-template/
├── e2e/
├── src/
│   ├── app/
│   ├── assets/
│   ├── environments/
│   ├── scss/
│   ├── index.html
│   └── ...
├── .angular-cli.json
├── ...
├── package.json
└── ...
```

## Documentation

The documentation is in progress....

## Creators

**Dan Triano**

* <https://twitter.com/dan_triano>
* <https://gitlab.com/dantriano>