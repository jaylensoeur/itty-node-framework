class UserDao {
    /**
     * @param {MongooseWrapper} mongooseWrapper
     */
    constructor(mongooseWrapper) {
        this._mongooseWrapper = mongooseWrapper;
    }

    /**
     * @returns {Promise<User[]>}
     */
    getAllUsers() {
        return this._mongooseWrapper.find()
    }

    /**
     * @param user
     * @returns {Promise<Error> | Promise<null>}
     */
    save(user) {
        return this._mongooseWrapper.save(user.getModel());
    }
}

export default UserDao;
