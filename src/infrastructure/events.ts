import { Item } from './todoist';

export class SessionEndedEvent { //Completed a Pomodoro
    constructor(public isPomodoro: boolean, public length: number) {

    }
}

export class SessionStartedEvent { // session has started
    constructor(public isPomodoro: boolean, public length: number) {
        
    }
}

export class StartSessionEvent { // start a new session
    constructor(public length: number, public item: Item | null = null) {

    }
}

export class TaskCompletedEvent {
    constructor(public completedTask: Item | null) {
        
    }
}