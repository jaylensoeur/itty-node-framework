class HomeController {
    constructor() {
    }

    index(req, res, next) {
        res.render('home/index', {
            layout: 'layout/default'
        });
    }
}

export default HomeController;
