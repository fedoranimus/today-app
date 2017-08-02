import { Aurelia, PLATFORM } from 'aurelia-framework';
import { Storage } from './services/storage';
import { User } from './services/user';
import TodoistAPI from 'todoist-js';

export function configure(aurelia: Aurelia): void {    
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .feature(PLATFORM.moduleName('components'))
        .feature(PLATFORM.moduleName('value-converters'));

    const storage = <Storage>aurelia.container.get(Storage);

    aurelia.start().then( async () => {
        const items = await storage.get("todoistToken"); //TODO Validate the key against Todoist
        const hasKey = Object.keys(items).length > 0 ? true : false;
        if(!hasKey)
            aurelia.setRoot(PLATFORM.moduleName('access'));
        else {
            const user = <User>aurelia.container.get(User);
            const items = await storage.get('todoistToken');
            if(Object.keys(items).length > 0) {
                user.apiToken = (<any>items)['todoistToken'];
                aurelia.setRoot(PLATFORM.moduleName('app'));
            }
        }
    });
}