import YamlConfigLoader from './express-yaml-config-loader';
import ServerContainerLoader from './express-service-container-loader';
import _ from 'lodash';

const yamlConfigLoader = new YamlConfigLoader();
const serviceContainerLoader = new ServerContainerLoader(yamlConfigLoader);
const jsons = serviceContainerLoader.load('config/service/service.yml');

/**
 * userDao:
 *  path: src/dao/user-dao
 *  dependencies: [dep1, dep2]
 *
 * userManager:
 *  paths: src/manager/user-manager
 *  dependencies: [userDao]
 * dep1:
 *  path: src/dep/item
 * dep2:
 *  path: src/dtp/three
 *  dependencies: [userManager]
 *
 */

const json = {
    userDao: {
        path: 'src/dao/user-dao',
        dependencies: ['user']
    },
    mongooseWrapper: {
        path: 'src/dao/mongoose-wrapper',
        dependencies: ['userDao']
    },
    user: {
        path: 'src/model/user'
    }
};

const container = [];

_.forEach(json, (value) => {
    loader(value);
});


function loader(obj) {
    if (!!obj.path) {
        const key = require('./' + obj.path);
        if (!!obj.dependencies) {
            const t = [];
            _.forEach(obj.dependencies, (dep) => {
                if (!!container[dep]) {
                    t.push(container[dep])
                } else {
                    t.push(loader(dep));
                }
            });
            console.log(t);

            delete json[obj];
        }else {
            return key;
        }
    }
}