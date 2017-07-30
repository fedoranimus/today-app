import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { SessionCompletedEvent, SessionStartedEvent } from '../../infrastructure/events';


export interface ISession {
    isPomodoro: boolean;
    length: boolean;
    startTime: Date;
}


@autoinject
export class Pomodoro {
    
    private activeSession: ISession;
    
    constructor(private eventAggregator: EventAggregator) {}

    completeSession(isPomodoro: boolean, length: number) {
        this.eventAggregator.publish(new SessionCompletedEvent(isPomodoro, length));
    }

    startSession(isPomodoro: boolean, length: number) {
        this.eventAggregator.publish(new SessionStartedEvent());
    }
}