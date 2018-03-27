import { Storage } from './services/storage';
import { autoinject, PLATFORM, Aurelia, useView } from 'aurelia-framework';
import { ConfiguresRouter, Router, RouterConfiguration } from 'aurelia-router';
import { Container } from 'aurelia-dependency-injection';
import { TodoistService } from './services/todoistService';
import { User } from './services/user';
import { ApiStore } from './apiStore';

@useView('./app.html')
@autoinject
export class Access implements ConfiguresRouter {
    
    private apiKey: string = "";
    private todoist: any;

    constructor(private container: Container, private router: Router, private aurelia: Aurelia, private apiStore: ApiStore) {}

    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "Today";

        config.map([
            { route: '', moduleId: PLATFORM.moduleName('./pages/activate'), name: 'activate' }
        ]).mapUnknownRoutes(PLATFORM.moduleName('./pages/not-found'));
    }

    async registerApiKey(keyInput: string) {
        this.apiKey = keyInput;
        this.apiStore.apiToken = this.apiKey;

        this.router.navigate('/', { replace: true, trigger: false });
        this.router.reset();
        //this.router.deactivate();

        this.aurelia.setRoot(PLATFORM.moduleName('app'));
    }
}