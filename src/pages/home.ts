import { autoinject, Aurelia, bindable } from 'aurelia-framework';
import { Storage } from '../services/storage';
import { TodoService } from '../services/todoService';
import { User, IProjectLocation } from '../services/user';
import { Filter, Item } from '../infrastructure/todoist';
import { EventAggregator } from 'aurelia-event-aggregator';
import { SessionStartedEvent, SessionCompletedEvent } from '../infrastructure/events';

@autoinject
export class Home {
    keyInput: string;
    
    tasks: Item[] = [];
    karma: any;
    isPremium: boolean = false;
    //@bindable activeProject: Project | null = null;
    @bindable activeFilter: Filter | null = null;
    //projects: Project[];
    @bindable firstName: string = "user";

    focusLength: number;
    isSessionRunning: boolean = false;

    constructor(private aurelia: Aurelia, private todoService: TodoService, private user: User, private eventAggregator: EventAggregator) {

    }

    async bind() {
        const user = await this.todoService.getUser();
        this.firstName = user.full_name.split(" ")[0];

        this.tasks = await this.todoService.getTasks();

        this.focusLength = this.user.focusLength;

        console.log(await this.todoService.getSync());

        this.eventAggregator.subscribe(SessionStartedEvent, (event: SessionStartedEvent) => {
            this.isSessionRunning = true;
        });

        this.eventAggregator.subscribe(SessionCompletedEvent, (event: SessionCompletedEvent) => {
            this.isSessionRunning = false;
        });
    }
}