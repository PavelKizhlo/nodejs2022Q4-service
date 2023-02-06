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
git clone {repository URL}
```
___
## Installing NPM modules

```
npm install
```
___
## Running application

```
npm start
```
By default, app expose on 4000 port. You can specify port on your own in `.env` file. Example of `.env` you can find in root directory. 

After starting the app you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.
___
## Structure

```json5
+-- dist // Source build
+-- doc // Open API Documentation in YAML
+-- src
|   +-- album // Album module
|   +-- artist // Artist module
|   +-- database // Database module
|   |   +-- entities // Constant value and Enum
|   |   |   +-- db.albums.ts // Entity class
|   |   |   +-- db.entity.ts // Abstract class
|   |   |   ...
|   |   +-- errors // Custom errors
|   |   +-- data.placeholder.ts // Mock data
|   |   +-- database.module.ts
|   |   +-- database.ts // In-memory database as service
|   +-- favorites // Favorites module
|   +-- track // Track module
|   +-- user // User module
+-- test // Jest testing
...

// Module structure
+-- src/album
|   +-- dto // DTO's
|   +-- interfaces // Interfaces
|   +-- album.controller.ts
|   +-- album.service.ts
|   +-- album.module.ts
```
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
