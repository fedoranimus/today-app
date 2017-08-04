import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { SessionCompletedEvent, SessionStartedEvent, StartSessionEvent } from '../../infrastructure/events';
import * as moment from 'moment';
import 'moment-timer';

export interface ISession {
    isPomodoro: boolean;
    length: number;
}

@autoinject
export class Pomodoro {
    
    //private activeSession: ISession | null;
    remainingTime: number;
    private timer: any;
    
    constructor(private eventAggregator: EventAggregator) {
        this.eventAggregator.subscribe(StartSessionEvent, (event: any) => {   
            this.timer = moment.duration(1, "seconds").timer({ 
                loop: true,
                start: false
            }, () => {
                this.remainingTime -= 1000;
                if(this.remainingTime < 1000) {
                    this.timer.stop();
                    this.completeSession(true, event.length);
                }
            });

            this.startSession(true, event.length); //TODO: Don't hardcore isPomodoro
        });
    }

    bind() {

    }

    completeSession(isPomodoro: boolean, length: number) {
        this.eventAggregator.publish(new SessionCompletedEvent(isPomodoro, length));
        //this.activeSession = null;
    }

    startSession(isPomodoro: boolean, length: number) {
        this.remainingTime = length;
        //this.activeSession = { isPomodoro: isPomodoro, length: length };
        this.timer.start();
        this.eventAggregator.publish(new SessionStartedEvent(isPomodoro, length));
    }

    pauseSession() {
        this.timer.stop();
    }

    resumeSession() {
        this.timer.start();
    }
}