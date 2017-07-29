export interface IUser {

}

export class User implements IUser {
    private _pomodoroGoal: number = 8;
    private _focusLength: number = 25;
    private _breakLength: number = 5;
    private _longBreakLength: number = 15;
    private _breakCount: number = 4;
    
    constructor() {

    }

    get pomodoroGoal() {
        return this._pomodoroGoal;
    }

    get focusLength() {
        return this._focusLength;
    }

    get breakLength() {
        return this._breakLength;
    }

    get longBreakLength() {
        return this._longBreakLength;
    }

    get breakCount() {
        return this._breakCount;
    }

}