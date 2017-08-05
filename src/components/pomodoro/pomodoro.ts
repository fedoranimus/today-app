import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { SessionEndedEvent, SessionStartedEvent, StartSessionEvent, TaskCompletedEvent } from '../../infrastructure/events';
import * as moment from 'moment';
import '../../libs/moment-timer';
import { Item } from '../../infrastructure/todoist';
import { User } from '../../services/user';

export interface ISession {
    isPomodoro: boolean;
    state: SessionState;
    length: number;
    remainingTime: number;
    item: Item | null;
}

enum SessionState {
    Running = "running",
    Paused = "paused",
    Stopped = "stopped",
    Completed = "completed"
}

@autoinject
export class Pomodoro {
    
    private activeSession: ISession | null;
    private timer: any;
    
    constructor(private eventAggregator: EventAggregator, private user: User) {
        this.eventAggregator.subscribe(StartSessionEvent, (event: StartSessionEvent) => {
            const isPomodoro = event.item !== null ? true : false;
            if(event.item) {
                this.activeSession = { isPomodoro: isPomodoro, length: event.length, remainingTime: event.length, item: event.item, state: SessionState.Running }; 
            }
            else {
                this.activeSession = { isPomodoro: isPomodoro, length: event.length, remainingTime: event.length, item: null, state: SessionState.Running };
            }
            
            this.createTimer();
            this.startSession();
        });
    }

    startSession() {
        this.timer.start();
        if(this.activeSession) {
            this.activeSession.state = SessionState.Running;
            this.eventAggregator.publish(new SessionStartedEvent(this.activeSession.isPomodoro, this.activeSession.length));
        }
    }

    startBreak() {
        if(this.user.currentBreak < 3)
            this.eventAggregator.publish(new StartSessionEvent(this.user.breakLength));
        else
            this.eventAggregator.publish(new StartSessionEvent(this.user.longBreakLength));
    }

    endBreak() {
        this.user.currentBreak++;
        if(this.user.currentBreak > 3)
            this.user.currentBreak = 0;

        this.endSession();
    }

    createTimer() {
        this.timer = moment.duration(1, "seconds").timer({ 
            loop: true,
            start: false
        }, () => {
            if(this.activeSession) {
                this.activeSession.remainingTime -= 1000;
                if(this.activeSession.remainingTime <= 0) {   
                    this.timerFinished();
                }
            }
        });
    }

    timerFinished() {
        if(this.activeSession && this.activeSession.isPomodoro)
            this.stopSession();
        else
            this.endBreak();
    }

    stopSession() {
        if(this.activeSession)
            this.activeSession.state = SessionState.Stopped;
    }

    quitSession() {
        this.endSession();
    }

    completeTask() {
        if(this.activeSession)
            this.eventAggregator.publish(new TaskCompletedEvent(this.activeSession.item));
    }

    endSession() {
        if(this.activeSession) {
            this.eventAggregator.publish(new SessionEndedEvent(this.activeSession.isPomodoro, this.activeSession.length));
        }
        this.activeSession = null;
    }

    completeSession(completeTask: boolean, takeBreak: boolean = true) {
        if(this.activeSession) {
            this.activeSession.state = SessionState.Completed;
            this.completeTask();
            if(takeBreak)
                this.startBreak();
        }
    }

    pauseSession() {
        this.timer.stop();
        if(this.activeSession)
            this.activeSession.state = SessionState.Paused;
    }

    resumeSession() {
        this.timer.start();
        if(this.activeSession)
            this.activeSession.state = SessionState.Running;
    }

    restartSession() {
        this.createTimer();
        this.startSession();
    }
}