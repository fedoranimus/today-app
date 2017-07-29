import { Storage } from './services/storage';
import { autoinject, PLATFORM, Aurelia, useView } from 'aurelia-framework';
import { ConfiguresRouter, Router, RouterConfiguration } from 'aurelia-router';
import { Container } from 'aurelia-dependency-injection';
import TodoistAPI from 'todoist-js';
import { Application } from './services/application';

@useView('./app.html')
@autoinject
export class Access implements ConfiguresRouter {
    
    private apiKey: string;
    private todoist: any;

    constructor(private storage: Storage, private container: Container, private router: Router, private aurelia: Aurelia, private application: Application) {}

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "Today";

        config.map([
            { route: '', moduleId: PLATFORM.moduleName('./pages/activate'), name: 'activate' }
        ]).mapUnknownRoutes(PLATFORM.moduleName('./pages/not-found'));
    }

    async registerApiKey(keyInput: string) {
        this.apiKey = keyInput;
        await this.storage.set({ todoistToken: this.apiKey });
        
        this.application.apiToken = this.apiKey;

        this.router.navigate('/', { replace: true, trigger: false });
        this.router.reset();
        //this.router.deactivate();

        this.aurelia.setRoot(PLATFORM.moduleName('app'));
    }
}