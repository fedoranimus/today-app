import { autoinject } from 'aurelia-framework';
import * as moment from 'moment';
import '../../lib/moment-timer';
import { Task } from '../../models/todoist';
import { Store } from '../../models/store';
import { State, SessionStatus, Settings } from '../../models/models';

@autoinject
export class Pomodoro {
    private timer: moment.Timer;

    state: State;
    remainingTime: number;
    isPomodoro: boolean;
    status: SessionStatus;
    task: Task;

    constructor(private store: Store) {
        store.state.subscribe(
            response => 
            {   
                this.onStateChanged(response);
            }
        );
    }

    private onStateChanged(state: State) {
        if(state.activeSession) {
            this.isPomodoro = state.activeSession.isPomodoro;
            this.status = state.activeSession.status;

            if(state.activeSession.task)
                this.task = state.activeSession.task;

            if(state.activeSession.status === SessionStatus.Starting) {
                this.remainingTime = state.activeSession.length;
                this.createTimer();
                this.startSession();
            }
        }
    }

    startSession() {
        this.timer.start();
        this.store.setSessionStatus(SessionStatus.Running);
    }

    startBreak(completedTask: boolean) {
        if(completedTask)
            this.completeTask();

        this.store.startBreak();
    }

    endBreak() {
        this.store.endSession();
        // this.user.currentBreak++;
        // if(this.user.currentBreak > 3)
        //     this.user.currentBreak = 0;
    }

    endSession() {
        this.store.endSession();
    }

    createTimer() {
        this.timer = moment.duration(1, "seconds").timer({ 
            loop: true,
            start: false
        }, () => {
            this.remainingTime -= 1000;
            if(this.remainingTime <= 0) {   
                this.isPomodoro ? this.completeSession() : this.endBreak();
            }
        });
    }

    completeTask() {
        if(this.status === SessionStatus.Completed)
            this.store.closeTask(this.task);
    }

    completeSession() {
        this.store.setSessionStatus(SessionStatus.Completed);
    }

    pauseSession() {
        this.timer.stop();
        this.store.setSessionStatus(SessionStatus.Paused);
    }

    resumeSession() {
        this.timer.start();
        this.store.setSessionStatus(SessionStatus.Running);
    }
}