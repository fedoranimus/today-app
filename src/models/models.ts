export interface State {
    tasks: Task[];
    isSessionActive: boolean;
    activeFilter: Filter | null;
}

export interface Task {
    id: number;
    content: string;
    date_string: string | null;
    due_date_utc: string | null;
    checked: number;
}

export interface Filter {
    id: number;
    name: string;
    query: string;
    color: number;
    item_order: number;
    is_deleted: number;
}