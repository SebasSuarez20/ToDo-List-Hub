export interface TaskModelDTO {
    id: string;
    title: string;
    description: string | null;
    is_completed: boolean;
    is_delete: boolean;
    created_at: string;
    id_category:string | null;
    name_category:string | null;
}
