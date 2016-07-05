import MiddlewareInterface from './middleware-interface';

class RequestLogger extends MiddlewareInterface {
    constructor() {
        super();
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    apply(req, res, next) {
         console.log('[', new Date(), ']', req.method, req.originalUrl);
        next();
    }
}

export default RequestLogger;
