import MiddlewareInterface from './middleware-interface';

class JsonContentType extends MiddlewareInterface {
    constructor() {
        super();
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    apply(req, res, next) {
        console.log('sending response in:  application/json');
        res.setHeader('content-type', 'application/json');
        next();
    }

}

export default JsonContentType;
