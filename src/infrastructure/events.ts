export class SessionCompletedEvent {
    constructor(public isPomodoro: boolean, public length: number) {

    }
}

export class SessionStartedEvent {
    constructor() {
        
    }
}