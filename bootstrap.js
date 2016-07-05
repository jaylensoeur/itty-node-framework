import NodeExpress from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';

import serviceContainer from './config/service/service-container';
import ExpressYamlRouterLoader from './express-yaml-router-loader';
import ExpressYamlConfigLoader from './express-yaml-config-loader';
import MiddlewareHandler from './express-middleware-handler';
import DatabaseConnectionHandler from './database-connection-handler';

class Bootstrap {
    static begin(){
        const env = process.env.NODE_ENV || 'dev';
        const express = NodeExpress();
        const expressYamlConfigLoader = new ExpressYamlConfigLoader(express);
        const config = expressYamlConfigLoader.read('config/environment/config-' + env + '.yml');
        const expressYamlRouterLoader = new ExpressYamlRouterLoader(express, serviceContainer.controller);
        const middlewareHandler = new MiddlewareHandler(express);
        const databaseConnectionHandler = new DatabaseConnectionHandler(mongoose, config.database.connection);
        const templatePath = __dirname + '/' + config.template.directory;

        let startUpMessage = ``;

        try {

            // default middleware
            // move out of bootstrap to ExpressSessionLoader
            if (config.session.type === 'session') {
                console.log('Using sessions');
                express.use(session({secret: config.session.secret}));
            }

            express.use(bodyParser.json());
            express.use(bodyParser.urlencoded({extended: true}));


            middlewareHandler.setMiddlewares(serviceContainer.middleware);

            expressYamlRouterLoader.read('config/route/route.yml');
            expressYamlRouterLoader.applyRoutes();

            express.set('port', config.server.port);

            // move out of bootstrap to ExpressTemplateLoader
            express.set('views', templatePath);

            express.engine(config.template.engine, exphbs({
                extname:'.hbs',
                layoutsDir: templatePath
            }));

            express.set('view engine', config.template.engine);


            startUpMessage = `Starting server:\nEnvironment [${env}] Port [${config.server.port}]\n`;
            startUpMessage += `Using template engine: [${config.template.engine}]\n`;
            startUpMessage += `template path: [${templatePath}]\n`;
            startUpMessage += `Session type: [${config.session.type}]\n`;
            startUpMessage += `Connecting to: [${config.database.type}]\n`;
            express.set('express_startup_message', startUpMessage);
            databaseConnectionHandler.connect();
            return express;
        } catch (err) {
            console.log('[Error]'.red, err.message);
            process.exit();
        }
    }
}

export default Bootstrap;
