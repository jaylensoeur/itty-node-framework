import Controller from './controller';
import BlogViewModel from '../view/model/blog-view-model';
import User from '../model/user';

class BlogController extends Controller {
    constructor(userDao) {
        super();
        this._userDao = userDao;
        this.count = 0;
    }

    /**
     * @param req
     * @param res
     */
    list(req, res) {

            this.count++;
         this._userDao.getAllUsers().
         then((users) => {
             if (!!users) {
                 const blogViewModel = new BlogViewModel();
                 blogViewModel.setTitle('Blogs');
                 console.log(this.count);
                 res.render('blog/list', {
                     layout: 'layout/default',
                     viewModel: blogViewModel,
                     users: users
                 });
             } else {
                 throw new Error('no users');
             }
         }).
         catch((err) => {
             console.log(err.message);
             res.status(500);
         })

    }

    create(req, res, next) {

        const user = new User();
        user.setFirstName(req.body.first_name);
        user.setLastName(req.body.last_name);

        this._userDao.save(user).
        then((err) => {
            if (!err) {
                return res.json(JSON.stringify(user));
            }

            throw new Error(err.message);
        }).
        catch((err) => {
            res.status(500).json(JSON.stringify(err));
        })
    }

    delete(req, res) {
        res.json('delete');
    }

    show(req, res) {
        res.json('show');
    }

    update(req, res) {
        res.json('update');
    }
}

export default BlogController;
