import q from 'q';

class MongooseWrapper {
    constructor(schema) {
        this._schema = schema;
    }

    /**
     * @param model
     */
    update(model) {
        return q.ninvoke(model, 'update');
    }

    /**
     * @param model
     */
    delete(model) {
        return q.ninvoke(model, 'remove');
    }

    /**
     * @param model
     */
    save(model) {
        return q.ninvoke(model, 'save');
    }

    /**
     * @param options
     */
    find(options) {
        if (typeof options === 'undefined') {
            options = {
                criteria: {},
                selectedFields: {},
                limit: 10,
                sort: {}
            };
        }

        if (typeof options.criteria === 'undefined') {
            options.criteria = {};
        }

        if (typeof options.selectedFields === 'undefined') {
            options.selectedFields = {};
        }

        if (typeof options.sort === 'undefined') {
            options.sort = {};
        }

        if (typeof options.limit === 'undefined') {
            options.limit = 10;
        }

        const defer = q.defer();

        const query = this._schema.
        find(options.criteria).
        limit(options.limit).
        sort(options.sort).
        select(options.selectedFields);

        query.exec((err, users) => {
            if (!!err) {
                defer.reject(err);
            } else {
                defer.resolve(users);
            }
        });

        return defer.promise;
    }
}

export default MongooseWrapper;
