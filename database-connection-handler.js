class DatabaseConnectionHandler {
    constructor(mongoose, connectionString) {
        this._mongoose = mongoose;
        this._connectionString = connectionString;
    }

    connect() {
        this._mongoose.connect(this._connectionString);
    }

    discount() {
        this._mongoose.connection.close()
    }
}

export default DatabaseConnectionHandler