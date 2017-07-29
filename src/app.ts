import { PLATFORM } from 'aurelia-framework';
import { ConfiguresRouter, Router, RouterConfiguration } from 'aurelia-router';

export class App implements ConfiguresRouter {
    configureRouter(config: RouterConfiguration, router: Router) {
        config.title = "Today";

        config.map([
            { route: '', moduleId: PLATFORM.moduleName('./pages/home'), name: 'home' }
        ]).mapUnknownRoutes(PLATFORM.moduleName('./pages/not-found'));
    }
}