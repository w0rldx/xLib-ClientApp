export default class AuthenticatedError extends Error {
    constructor() {
        super();

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, AuthenticatedError.prototype);
    }
}
