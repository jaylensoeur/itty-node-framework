import mongoose from 'mongoose';
import UserSchema from '../schema/user-schema';

class User {
    constructor() {
        this._model = new UserSchema();
    }

    getFirstName() {
        return this._model.first_name;
    }

    setFirstName(firstName) {
        this._model.first_name = firstName;
        return this;
    }

    getLastName() {
        return this._model.last_name;
    }

    setLastName(lastName) {
        this._model.last_name = lastName ;
        return this;
    }

    getModel() {
        return this._model;
    }
}

export default User;
