import { baseModel } from "./baseModel";

export class taskModel extends baseModel {

    private title: string;
    private description: string;
    private isCompleted: boolean;
    private id_category:string | null;

    constructor() {
        super();
        this.title = "";
        this.description = "";
        this.isCompleted = false;
        this.id_category = null;
    }

    public setTitle(title: string): this {
        this.title = title;
        return this;
    }

    public setDescription(description: string): this {
        this.description = description;
        return this;
    }

    public setidCategory(idCategory:string | null){
        this.id_category = idCategory;
        return this;
    }

    public build() {
        return {
            id:this.id,
            title: this.title,
            description: this.description,
            created_at: this.created_at,
            isCompleted: this.isCompleted,
            is_delete:this.is_delete
        }
    }
}