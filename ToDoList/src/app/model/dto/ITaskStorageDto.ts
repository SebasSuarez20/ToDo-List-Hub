import { TaskModelDTO } from "./ItaskDTO";

export interface ITaskStorageDTO{

    version:number,
    data:TaskModelDTO[]
}