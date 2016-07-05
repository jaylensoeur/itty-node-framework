import yaml from 'yamljs';
import _ from 'lodash';
import colors from 'colors';

class ExpressYamlRouterLoader {
    constructor(express, serviceContainer) {
        this._routerConfig = null;
        this._express = express;
        this._serviceContainer = serviceContainer;
    }

    read(fileName) {
        this._routerConfig = yaml.load(fileName);
    }

    applyRoutes() {
        _.forEach(this._routerConfig, (route) => {
            //noinspection JSUnresolvedVariable
            const obj = route.defaults.controller.split(':');
            const controller = this._serviceContainer[obj[0].toLowerCase() + 'Controller'];
            if (!!controller) {
                const action = obj[1];

                _.forEach(route.methods, (method) => {

                    if (typeof controller[action] === 'undefined') {
                        throw new Error(`Method ${obj[0]}Controller:${action} not implemented in class`);
                    }

                    this._express[method](route.path, (req, res, next) => {
                        controller[action](req, res, next)
                    });
                });
                console.log('Applying route: ', route.path);
            } else {
                throw new Error(`${obj[0]}Controller is not implemented`);
            }
        });
    }
}

export default ExpressYamlRouterLoader;