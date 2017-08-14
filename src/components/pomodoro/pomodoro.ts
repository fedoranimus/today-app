import { autoinject } from 'aurelia-framework';
import * as moment from 'moment';
import 'moment-timer';
import { Task } from '../../models/todoist';
import { Store } from '../../models/store';
import { State, SessionStatus } from '../../models/models';

@autoinject
export class Pomodoro {
    private timer: moment.Timer;
    private remainingTime: number;
    
    state: State;

    constructor(private store: Store) {
        store.state.subscribe(
            response => this.state = response
        );
        // this.eventAggregator.subscribe(StartSessionEvent, (event: StartSessionEvent) => {
        //     const isPomodoro = event.item !== null ? true : false;
        //     if(event.item) {
        //         this.activeSession = { isPomodoro: isPomodoro, length: event.length, remainingTime: event.length, item: event.item, state: SessionState.Running }; 
        //     }
        //     else {
        //         this.activeSession = { isPomodoro: isPomodoro, length: event.length, remainingTime: event.length, item: null, state: SessionState.Running };
        //     }
            
        //     this.createTimer();
        //     this.startSession();
        // });
    }

    // startSession() {
    //     this.timer.start();
    //     if(this.activeSession) {
    //         this.activeSession.state = SessionState.Running;
    //         this.eventAggregator.publish(new SessionStartedEvent(this.activeSession.isPomodoro, this.activeSession.length));
    //     }
    // }

    // startBreak(completedTask: boolean) {
    //     if(completedTask)
    //         this.completeTask();


    //     if(this.user.currentBreak < 3)
    //         this.eventAggregator.publish(new StartSessionEvent(this.user.breakLength));
    //     else
    //         this.eventAggregator.publish(new StartSessionEvent(this.user.longBreakLength));
    // }

    // endBreak() {
    //     this.user.currentBreak++;
    //     if(this.user.currentBreak > 3)
    //         this.user.currentBreak = 0;

    //     this.endSession();
    // }

    createTimer() {
        this.timer = moment.duration(1, "seconds").timer({ 
            loop: true,
            start: false
        }, () => {
            this.remainingTime -= 1000;
            if(this.remainingTime <= 0) {   
                //this.timerFinished();
            }
        });
    }

    // timerFinished() {
    //     if(this.activeSession && this.activeSession.isPomodoro)
    //         this.completeSession();
    //     else
    //         this.endBreak();
    // }

    // completeTask() {
    //     if(this.activeSession)
    //         this.eventAggregator.publish(new TaskCompletedEvent(this.activeSession.item));
    // }

    // endSession() {
    //     if(this.activeSession) {
    //         let length = this.activeSession.length - this.activeSession.remainingTime;
    //         if(!this.activeSession.isPomodoro)
    //             length = 0;

    //         this.eventAggregator.publish(new SessionEndedEvent(this.activeSession.isPomodoro, length));
    //     }
    //     this.activeSession = null;
    // }

    // completeSession() {
    //     if(this.activeSession) {
    //         this.activeSession.state = SessionState.Completed;
    //     }
    // }

    pauseSession() {
        this.timer.stop();
        this.store.setSessionStatus(SessionStatus.Paused);
    }

    resumeSession() {
        this.timer.start();
        this.store.setSessionStatus(SessionStatus.Running);
    }
}