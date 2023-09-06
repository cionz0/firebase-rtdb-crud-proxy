/**
 * @module test/database.test
 * @description Test suite for Firebase Realtime Database operations.
 * @createdOn 2023-09-06
 * @project firebase-rtdb-crud-proxy
 * @author cionzo <cionzoh@gmail.com>
 */

/* eslint-disable no-undef */
const {expect} = require("chai");
const admin = require("firebase-admin");
// const sinon = require('sinon');

const fs = require("fs");
const prompt = require("prompt-sync")({sigint: true})
const serviceAccount = JSON.parse(fs.readFileSync(prompt("please enter the path to your service account: ")));
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com`,
});

const REAL_DB = admin.database();


const {create, read, update, delete: del} = require("../src/index");
const {DatabaseError} = require("../src/database-errors");

describe("Firebase Realtime Database CRUD Operations", () => {

    const path = "test/path";
    const unfeasiblePath = "test/path.something";
    const data_john = {name: "John"};
    const data_alice = {name: "Alice"};


    describe("Create Entry", () => {
        it("should create an entry successfully", async () => {

            await create(path, data_john);
            const db_data = (await REAL_DB.ref(path).once("value")).val();

            expect(data_john).to.be.deep.equal(db_data)
        });

        it("should handle errors during entry creation", async () => {

            try {
                await create(unfeasiblePath, data_john);
            } catch (error) {

                expect(error).to.be.an.instanceOf(DatabaseError);
                expect(error.message).to.equal(`Error while creating an entry at ${unfeasiblePath}`);
                expect(error.cause).to.not.be.null;
                expect(error.cause.message).to.not.be.null;
                expect(error.code).to.equal(500);
            }
        });
    });

    describe("Read Data", () => {
        it("should read data from a specific node successfully", async () => {

            // prepare data
            await REAL_DB.ref(path).update(data_alice)

            const result = await read(path);

            // Verify the result
            expect(result).to.deep.equal(data_alice);
        });

        it("should handle errors during data reading", async () => {


            // Mock Firebase once method to throw an error
            // admin.database().ref().once.rejects(new Error('Firebase error'));

            try {
                await read(unfeasiblePath);
            } catch (error) {
                // Verify that a DatabaseError is thrown with the correct message
                expect(error).to.be.an.instanceOf(DatabaseError);
                expect(error.message).to.equal(`Error while reading data from ${unfeasiblePath}`);
                expect(error.cause).to.not.be.null;
                expect(error.cause.message).to.not.be.null;
                expect(error.code).to.equal(500);
            }
        });
    });

    describe("Update Data", () => {
        it("should update data at a specific path successfully", async () => {

            const newData = {name: "Bob"};

            // // Mock Firebase update method
            // admin.database().ref().update.resolves();

            await update(path, newData);
            const db_data = (await REAL_DB.ref(path).once("value")).val();

            expect(newData).to.be.deep.equal(db_data)
        });

        it("should handle errors during data updating", async () => {

            const newData = {name: "Bob"};

            try {
                await update(unfeasiblePath, newData);
            } catch (error) {
                expect(error).to.be.an.instanceOf(DatabaseError);
                expect(error.message).to.equal(`Error while updating data at ${unfeasiblePath}`);
                expect(error.cause).to.not.be.null;
                expect(error.cause.message).to.not.be.null;
                expect(error.code).to.equal(500);
            }
        });
    });
    //
    describe("Delete Data", () => {
        it("should delete data at a specific path successfully", async () => {
            const path = "test/path";

            // Mock Firebase remove method
            // admin.database().ref().remove.resolves();

            await del(path);
            const db_data = (await REAL_DB.ref(path).once("value")).val();
            // Verify that the remove method was called
            // expect(admin.database().ref().remove.calledOnce).to.be.true;
            expect(db_data).to.be.null;
        });

        it("should handle errors during data deletion", async () => {


            // Mock Firebase remove method to throw an error
            // admin.database().ref().remove.rejects(new Error('Firebase error'));

            try {
                await del(unfeasiblePath);
            } catch (error) {
                // Verify that a DatabaseError is thrown with the correct message
                expect(error).to.be.an.instanceOf(DatabaseError);
                expect(error.message).to.equal(`Error while deleting data from ${unfeasiblePath}`);
                expect(error.cause).to.not.be.null;
                expect(error.cause.message).to.not.be.null;
                expect(error.code).to.equal(500);
            }
        });
    });
});
