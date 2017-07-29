import { Aurelia, PLATFORM } from 'aurelia-framework';
import { Storage } from './services/storage';
import { TodoService } from './services/todoService';
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
            const todoService = <TodoService>aurelia.container.get(TodoService);
            const items = await storage.get('todoistToken');
            if(Object.keys(items).length > 0) {
                todoService.apiToken = (<any>items)['todoistToken'];
                aurelia.setRoot(PLATFORM.moduleName('app'));
            }
        }
    });
}