import _ from 'lodash';

class MiddleHandler {
    constructor(express) {
        this._express = express;
    }

    /**
     * @param {MiddlewareInterface} middlewareCollection
     */
    setMiddlewares(middlewareCollection) {
        _.forEach(middlewareCollection, (middleware) => {
            this._express.use(middleware.apply.bind(middleware));
        });
    }

    /**
     *
     * @param {MiddlewareInterface} middleware
     */
    addMiddleware(middleware) {
        this._express.use(middleware.apply.bind(middleware));
    }
}

export default MiddleHandler;