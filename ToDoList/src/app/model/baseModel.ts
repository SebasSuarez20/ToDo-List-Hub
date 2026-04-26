export abstract class baseModel {
    public created_at: string;
    public id: string;
    public is_delete:boolean;
    constructor() {
        this.id = crypto.randomUUID().toString();
        this.created_at = new Date().toISOString();
        this.is_delete = false;
    }
}