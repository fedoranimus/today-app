import { autoinject } from 'aurelia-framework';
import { Item } from '../../infrastructure/todoist';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ShowToastEvent } from '../../infrastructure/events';

@autoinject
export class Toast {
    isDisplayed = false;
    message: string = "";
    canUndo = false;
    item: Item | null = null;

    constructor(private eventAggregator: EventAggregator) {
        eventAggregator.subscribe(ShowToastEvent, (event: ShowToastEvent) => {
            this.show(event.message, event.item);
        });
    }

    show(message: string, item: Item | null = null) {
        this.isDisplayed = true;
        this.message = message;
        if(item) {
            this.canUndo = true;
            this.item = item;
        }
        setTimeout(() => {
            this.message = "";
            this.canUndo = false;
            this.isDisplayed = false;
            this.item = null;
        }, 5000);
    }

    undo() {
        console.log(this.item);
        //TODO: Emit event with item
    }
}