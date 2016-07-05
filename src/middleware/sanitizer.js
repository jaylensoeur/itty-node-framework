import _ from 'lodash';

import MiddlewareInterface from './middleware-interface';

class Sanitizer extends MiddlewareInterface {
    constructor(validator) {
        super();
        this._validator = validator;
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    apply(req, res, next) {
        const method = req.method.toLowerCase();
        const collector = [];
        if (method === 'post' || method === 'put') {
            _.forEach(req.body, (param, key) => {
                req.body[key] = this._validator.escape(param);
                collector.push(key)
            });
            console.log('[', new Date(), `] Sanitizing request: ${collector}`);
        }
        next();
    }
}

export default Sanitizer;
