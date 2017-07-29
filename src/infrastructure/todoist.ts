export default interface Todoist {
    //TODO
    projects: Project[];
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