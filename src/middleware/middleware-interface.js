class MiddlewareInterface {
    constructor() {
        if (MiddlewareInterface.constructor === MiddlewareInterface) {
            throw new Error(`Can't instantiate MiddlewareInterface`);
        }
    }

    apply(req, res, next) {
        throw new Error(`must implement MiddlewareInterface::apply(req, res, next)`);
    }
}

export default MiddlewareInterface;
