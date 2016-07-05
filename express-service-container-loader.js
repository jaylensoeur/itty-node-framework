import yaml from 'yamljs';
import _ from 'lodash';
import colors from 'colors';

class ExpressYamlServiceContainerLoader {
    constructor(yamlConfigLoader) {
        this._yamlConfigLoader = yamlConfigLoader;
    }

    load(fileName) {
        return this._yamlConfigLoader.read(fileName);
    }
}

export default ExpressYamlServiceContainerLoader;