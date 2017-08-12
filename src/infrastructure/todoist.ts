export interface Sync {
    //TODO
    items: Item[];
    projects: Project[];
    filters: Filter[];
}

export interface Item {
    all_day: boolean;
    assigned_by_uid: null; //TODO
    checked: number;
    collapsed: number;
    content: string;
    date_string: string;
    date_added: string;
    date_lang: string;
    day_order: number;
    due_date_utc: string;
    has_more_notes: boolean;
    in_history: number;
    indent: number;
    is_archived: number;
    is_deleted: number;
    item_order: number;
    labels: number[];
    parent_id: number | null;
    priority: number;
    project_id: number;
    id: number;
    responsible_uid: null; //TODO
    sync_id: null; //TODO
    user_id: number;
}

export interface Project {
    collapsed: number;
    color: number;
    has_more_notes: boolean;
    id: number;
    inbox_project: boolean;
    indent: number;
    is_archived: number;
    is_deleted: number;
    item_order: number;
    name: string;
    parent_id: number | null;
    shared: boolean;
}

export interface Filter {
    color: number;
    id: number;
    is_deleted: number;
    item_order: number;
    name: string;
    query: string;
}