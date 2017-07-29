import { autoinject, Aurelia } from 'aurelia-framework';
import { Storage } from '../services/storage';
import { Application } from '../services/application';

@autoinject
export class Home {
    keyInput: string;
    
    karma: any;

    constructor(private aurelia: Aurelia, private application: Application) {
        this.init();
    }

    private async init() {
        const stats = await this.application.getStats();
        this.karma = stats.karma;
        //console.log(await this.application.getTodayTasks());
    }
}