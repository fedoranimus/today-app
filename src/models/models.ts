import { Task, Filter } from './todoist';

export interface State {
    tasks: Task[];
    isSessionActive: boolean;
    activeFilter: Filter | null;
    apiToken: string | null;
}