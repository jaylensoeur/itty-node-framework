import BlogController from './../../src/controller/blog-controller';
import HomeController from './../../src/controller/home-controller';
import ErrorController from './../../src/controller/error-controller';

import MongooseWrapper from '../../src/dao/mongoose-wrapper';
import UserSchema from '../../src/schema/user-schema';
import UserDao from '../../src/dao/user-dao'

const userDao = new UserDao(new MongooseWrapper(UserSchema));

export default {
    'blogController': new BlogController(userDao),
    'homeController': new HomeController(),
    'errorController': new ErrorController()
};
