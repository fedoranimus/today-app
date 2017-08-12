export interface Task {
    id: number;
    project_id: number;
    content: string;
    completed: boolean;
    label_ids: number[];
    order: number;
    indent: number;
    priority: number;
    due: Due
    url: string;
    comment_count: number;
}

interface Due {
    string: string;
    date: string;
    recurring: boolean;
    datetime: string | undefined;
    timezone: string | undefined;
}

export interface Filter {
    id: number;
    name: string;
    query: string;
    color: number;
    item_order: number;
    is_deleted: number;
}