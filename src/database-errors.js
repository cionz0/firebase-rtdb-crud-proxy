/**
 * @module src/database-errors
 * @description Defines custom error classes related to database operations.
 * @createdOn 2023-09-06
 * @project firebase-rtdb-crud-proxy
 * @author cionzo
 */

"use strict";

/**
 * Represents a generic managed Error for database operations.
 * @class
 * @augments Error
 */
class DatabaseError extends Error {
    /**
     * Creates an instance of DatabaseError.
     * @class
     * @param {string} message - The error message.
     * @param {Error|undefined} cause - The underlying cause of the error (optional).
     * @param {number} code - The error code (default: 500).
     */
    constructor(message = "An error occurred while performing CRUD operations", cause = undefined, code = 500) {
        super(message);

        /**
         * The name of the error class.
         * @member {string}
         */
        this.name = "DatabaseError";

        /**
         * The HTTP status code associated with the error.
         * @member {number}
         */
        this.code = code;

        /**
         * The error message.
         * @member {string}
         */
        this.message = message;

        /**
         * The underlying cause of the error (optional).
         * @member {Error|undefined}
         */
        if (cause) {
            this.cause = cause;
        }
    }
}

module.exports = { DatabaseError };
