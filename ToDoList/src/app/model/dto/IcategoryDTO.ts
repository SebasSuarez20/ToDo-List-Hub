export interface ICategoryDTO {
    id: string;
    name: string;
    name_category?: string;
    description?: string;
    color?: string;
    icon?: string;
    value:number;
    is_delete:boolean;
    created_at:string;
}