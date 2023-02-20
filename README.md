# Home Library Service

## Description

Home Library Service is NestJS app, which allow `Users` to create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library!
___
## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
___
## Downloading

```
git clone https://github.com/PavelKizhlo/nodejs2022Q4-service
```
___
## Installing NPM modules

```
npm install
```
___
## Running application
#### ( It is recommended to start the app in container! See bellow. )
Application works with PostgreSQL database. If you have postgres server locally, specify Postgres environment variables in `.env` file. Example of `.env` you can find in root directory. You also need to start migrations manually by npm script
```
npm run typeorm:migration
```
and start app with script
```
npm run start
```
By default, app expose on 4000 port. You can specify port on your own in `.env` file.

After starting the app you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.
___
## Docker
You also can run application in container. You have to install Docker on your machine. And start docker-composer with docker CLI:
```
docker-compose up
```
or npm script:
```
npm run docker:dev
```
You can build images with:
```
npm run docker:build
```
And stop containers with:
```
npm run docker:stop
```
Here is script for scanning vulnerabilities (You should login to Snyk, after first 10 scans. https://snyk.io/ - for more):
```
npm run docker:scan
```
#### Notes:
Development was carried out on Mac with `M1` chip. That's why `--platform=linux/amd64` flag used. If your machine have other architecture, please, remove it.

Hot reloading for app development was implemented by mounting `./usr/app/src` volume to `./src` local directory and using `npm run start:dev` as command for container. But if you are on Windows, disable WSL and use Hyper-V instead. WSL2 doesn't work with hot reload. Other option is to use nodemon for hot reloading. For this replace
```
command: sh -c "npm run typeorm:migration && npm run start:dev"
```
by
```
command: sh -c "npm run typeorm:migration && npm run start:dev-nodemon"
```
in `docker-compose.yml`.
___
## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```
___
### Auto-fix and format

```
npm run lint
```

```
npm run format
```
___
### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
