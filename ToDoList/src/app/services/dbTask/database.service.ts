import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';
import { TaskModelDTO } from 'src/app/model/dto/ItaskDTO';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceTask {
  private _storage: Storage | null = null;
  private storageObservable$ = new Subject<TaskModelDTO[]>();
  private readonly keyDb: string = "task" as const;

  constructor(private storage: Storage, private logger: LoggerService) {
    this.init();
  }

  public async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.logger.log("[DatabaseService]", "Ionic Storage inicializado.")
  }

  public async getTasks(): Promise<TaskModelDTO[]> {
    const data = await this._storage?.get(this.keyDb);
    const dataFilter = data?.filter((s: TaskModelDTO) => s.is_delete == false);
    return dataFilter ?? [];
  }

  private async updateTask(data: TaskModelDTO[]) {
    await this.storage.set(this.keyDb, data);
  }

  async insertTask(modeldto: TaskModelDTO) {
    const data = await this.getTasks();
    data.push(modeldto);
    await this._storage?.set(this.keyDb, data);
    await this.storageObserver();
  }

  public async updateTaskStatus(id: string, iscomplete: boolean) {
    const data = (await this.getTasks()).map((s: TaskModelDTO) => {
      if (s.id === id) s.is_completed = iscomplete
      return s;
    })
    await this.updateTask(data);
    await this.storageObserver();
  }

  public async deleteTask(id: string) {
    debugger;
     try{
       const data = (await this.getTasks()).map((task: TaskModelDTO) => {
         console.log('Comparando:', task.id, id);

         return task.id === id
           ? { ...task, is_delete: true }
           : task;
       });
    await this.updateTask(data);
    await this.storageObserver();
     }catch(err){
       throw new Error(`Error: ${err}`);
     }
  }

  private async storageObserver() {
    const data = await this.getTasks();
    this.storageObservable$.next(data);
  }

  public storageListening() {
    return this.storageObservable$.asObservable();
  }

}
