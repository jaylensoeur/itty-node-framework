class ErrorController {
    constructor() {
    }

    index(req, res, next) {
       res.render('error/index', {
           layout: 'layout/error'
       });
    }
}

export default ErrorController;
