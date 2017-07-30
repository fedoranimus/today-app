export default interface Todoist {
    //TODO
    items: Item[];
    projects: Project[];
}

export interface Item {
    content: string;
    due_date_utc: string;
    project_id: number;
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