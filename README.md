# firebase-rtdb-crud-proxy
Provides a proxy for both CRUD and advanced operations on Firebase Realtime DataBase

# Firebase Realtime Database CRUD Library

![Build Status](https://your-ci-service.com/build/status)

## Overview

The Firebase Realtime Database CRUD Library is a JavaScript library that provides a set of functions for performing Create, Read, Update, and Delete (CRUD) operations on a Firebase Realtime Database. This library simplifies database interactions in your application, allowing you to focus on your core functionality.

## Features

- Create new entries in the database.
- Read data from specific nodes.
- Update data at specific paths.
- Delete data at specific paths.

## Installation

You can install the library via npm:

```bash
npm install firebase-rtdb-crud
```

## Usage
To use this library, you need to initialize Firebase Admin SDK with your Firebase project credentials. Once initialized, you can import and use the provided functions to interact with the Firebase Realtime Database.

## Initialize Firebase Admin SDK
```javascript
const admin = require("firebase-admin");

const serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-project-id.firebaseio.com",
});
```

### Example Usage
```javascript
const db = require("firebase-rtdb-crud");

// Create a new entry
db.create("path/to/your/node", { key: "value" })
  .then(() => {
    console.log("Entry created successfully.");
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

// Read data from a specific node
db.read("path/to/your/node")
  .then((dataSnapshot) => {
    console.log("Data:", dataSnapshot.val());
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

// Update data at a specific path
db.update("path/to/your/node", { key: "new-value" })
  .then(() => {
    console.log("Data updated successfully.");
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

// Delete data at a specific path
db.delete("path/to/your/node")
  .then(() => {
    console.log("Data deleted successfully.");
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
```

# API Documentation
For detailed information on each function and its parameters, please refer to the [API documentation](docs/firebase-rtdb-crud-proxy/1.0.0/index.html).

# Contributing
We welcome contributions from the community! If you have any ideas, bug reports, or feature requests, please open an issue or submit a pull request.

# License
This library is licensed under the GNU GENERAL PUBLIC LICENSE. See the [LICENSE](LICENSE) file for details.

