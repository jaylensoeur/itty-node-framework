import yaml from 'yamljs';
import _ from 'lodash';

class ExpressYamlConfigLoader {
    constructor() {
    }

    read(fileName) {
        let json = yaml.load(__dirname + '/' + fileName);
        if(!!json.imports) {
            let importedFile = {};
            _.forEach(json.imports, (yamlDoc) => {
                importedFile = this.read(yamlDoc.resource);
                delete json.imports;
                _.assign(importedFile, json);
            });

            return importedFile;
        }

        return json;
    }
}

export default ExpressYamlConfigLoader;
