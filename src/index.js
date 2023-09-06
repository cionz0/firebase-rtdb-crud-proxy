/**
 * @module src/index
 * @description A module for performing CRUD operations on a Firebase Realtime Database.
 * @createdOn 2023-09-06
 * @project firebase-rtdb-crud-proxy
 * @author cionzo <cionzoh@gmail.com>
 */
"use strict";

const admin = require("firebase-admin");
const DatabaseError = require("./database-errors").DatabaseError;
const db = admin.database();

/**
 * Create an entry in the Firebase Realtime Database.
 * @param {string} path - The path to the node where the entry will be created.
 * @param {*} data - The data to be stored in the entry.
 * @returns {Promise<void>} A Promise that resolves when the entry is created successfully.
 * @throws {DatabaseError} When an error occurs while creating the entry.
 */
async function createEntry(path, data) {
    try {
        return db.ref(path).set(data);
    } catch (error) {
        // console.error(error);
        throw new DatabaseError(`Error while creating an entry at ${path}`, error);
    }
}

/**
 * Read data from a specific node in the Firebase Realtime Database.
 * @param {string} path - The path to the node in the database from which data will be read.
 * @returns {Promise<admin.database.DataSnapshot>} A Promise that resolves with the data read from the node.
 * If the node does not exist, the Promise resolves with null.
 * @throws {DatabaseError} When an error occurs while reading data from the node.
 */
async function readDataFromNode(path) {
    try {
        return (await db.ref(path).once("value")).val();
    } catch (error) {
        // console.error(error);
        throw new DatabaseError(`Error while reading data from ${path}`, error);
    }
}

/**
 * Update data at a specific path in the Firebase Realtime Database.
 * @param {string} path - The path to the node in the database to be updated.
 * @param {*} newData - The new data to be set at the specified path.
 * @returns {Promise<void>} A Promise that resolves when the data is updated successfully.
 * @throws {DatabaseError} When an error occurs while updating data at the path.
 */
async function updateDataAtPath(path, newData) {
    try {
        return await db.ref(path).update(newData);
    } catch (error) {
        // console.error(error);
        throw new DatabaseError(`Error while updating data at ${path}`, error);
    }
}

/**
 * Delete data at a specific path in the Firebase Realtime Database.
 * @param {string} path - The path to the node in the database to be deleted.
 * @returns {Promise<void>} A Promise that resolves when the data is deleted successfully.
 * @throws {DatabaseError} When an error occurs while deleting data at the path.
 */
async function deleteDataAtPath(path) {
    try {
        await db.ref(path).remove();
    } catch (error) {
        // console.error(error);
        throw new DatabaseError(`Error while deleting data from ${path}`, error);
    }
}

/**
 * Firebase Realtime Database interaction module.
 * @alias module:database/db
 */
module.exports = {
    create: createEntry,
    read: readDataFromNode,
    update: updateDataAtPath,
    delete: deleteDataAtPath,
};
