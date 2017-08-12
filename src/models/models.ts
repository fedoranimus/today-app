import { Task, Filter } from './todoist';

export interface State {
    tasks: Task[];
    activeSession: Session | null;
    activeFilter: Filter | null;
    currentBreak: number;
    settings: Settings;
}

export interface Settings {
    pomodoroLength: number;
    breakLength: number;
    longBreakLength: number;
    breakCount: number;
}

export interface Session {
    status: SessionStatus
    isPomodoro: boolean;
    length: number;
    task: Task | null;
}

export enum SessionStatus {
    Starting = "starting",
    Running = "running",
    Paused = "paused",
    Completed = "completed"
}