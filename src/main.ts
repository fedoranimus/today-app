import { Aurelia, PLATFORM } from 'aurelia-framework';
import { Storage } from './services/storage';
import { Application } from './services/application';
import TodoistAPI from 'todoist-js';

export function configure(aurelia: Aurelia): void {    
    aurelia.use
        .standardConfiguration()
        .developmentLogging();

    const storage = <Storage>aurelia.container.get(Storage);

    aurelia.start().then( async () => {
        const items = await storage.get("todoistToken"); //TODO Validate the key against Todoist
        const hasKey = Object.keys(items).length > 0 ? true : false;
        if(!hasKey)
            aurelia.setRoot(PLATFORM.moduleName('access'));
        else {
            const application = <Application>aurelia.container.get(Application);
            const items = await storage.get('todoistToken');
            if(Object.keys(items).length > 0) {
                application.apiToken = (<any>items)['todoistToken'];
                aurelia.setRoot(PLATFORM.moduleName('app'));
            }
        }
    });
}