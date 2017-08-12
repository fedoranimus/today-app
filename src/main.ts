import { Aurelia, PLATFORM } from 'aurelia-framework';
import { ApiStore } from './apiStore';
import { Config } from 'aurelia-api';


export function configure(aurelia: Aurelia): void {    
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .feature(PLATFORM.moduleName('components/index'))
        .feature(PLATFORM.moduleName('value-converters/index'))
        .plugin(PLATFORM.moduleName('aurelia-api'), (config: Config) => {
            config.registerEndpoint('todoist', 'https://beta.todoist.com/API/v8/');
        });

    const apiStore = <ApiStore>aurelia.container.get(ApiStore);

    aurelia.start().then( async () => {
        const apiToken = await apiStore.apiToken;
        if(!apiToken)
            aurelia.setRoot(PLATFORM.moduleName('access'));
        else {
            aurelia.setRoot(PLATFORM.moduleName('app'));
        }
    });
}