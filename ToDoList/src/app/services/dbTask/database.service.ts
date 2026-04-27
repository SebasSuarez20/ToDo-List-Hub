import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';
import { TaskModelDTO } from 'src/app/model/dto/ItaskDTO';
import { LoggerService } from '../logger/logger.service';
import { actionDb } from 'src/app/enum/actionsDb';
import { ICategoryDTO } from 'src/app/model/dto/IcategoryDTO';
import { ActionCrudToDoList } from '../ToDoList-actions/action-crud-to-do-list';

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceTask {
  private _storage: Storage | null = null;
  private storageObservable$ = new Subject<TaskModelDTO[]>();
  private readonly keyDb: string = "task" as const;

  constructor(private readonly storage: Storage, private readonly logger: LoggerService) {
    this.init();
  }

  public async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.logger.log("[DatabaseService]", "Ionic Storage inicializado.")
  }

  public async systemVersion(version:number){
    await this.storage.set("taskVersion",version);
  }

  public async getVersionDB(){
    return await this.storage.get("taskVersion");
  }

  public async getTasks(): Promise<TaskModelDTO[]> {
    const data = await this._storage?.get(this.keyDb);
    const dataFilter = data?.filter((s: TaskModelDTO) => s.is_delete == false);
    return dataFilter ?? [];
  }

  private async updateTask(data: TaskModelDTO[]) {
    await this.storage.set(this.keyDb, data);
  }

  public async insertTask(modeldto: TaskModelDTO) {
    const data = await this.getTasks();
    data.push(modeldto);
    await this._storage?.set(this.keyDb, data);
    await this.storageObserver();
  }

  public async updateTaskAssigned(id: string, fkCategory: string, nameCategory: string) {
    try {
      const data = (await this.getTasks()).map((s: TaskModelDTO) => {
        if (s.id === id) {
          s.id_category = fkCategory;
          s.name_category = nameCategory;
        }
        return s;
      })
      await this.updateTask(data);
      await this.storageObserver();
    } catch (err) {
      throw err;
    }
  }

  public async updateTaskStatus(id: string, iscomplete: boolean) {
    try {
      const data = (await this.getTasks()).map((s: TaskModelDTO) => {
        if (s.id === id) s.is_completed = iscomplete
        return s;
      })
      await this.updateTask(data);
      await this.storageObserver();
    } catch (err) {
      throw err;
    }
  }

  public async deleteTask(id: string) {
    try {
      const data = (await this.getTasks()).map((task: TaskModelDTO) => {
        return task.id === id
          ? { ...task, is_delete: true }
          : task;
      });
      await this.updateTask(data);
      await this.storageObserver();
    } catch (err) {
      throw err;
    }
  }

  private async storageObserver() {
    const data = await this.getTasks();
    this.storageObservable$.next(data);
  }

  public storageListening() {
    return this.storageObservable$.asObservable();
  }

  public async triggerTask(action: actionDb, modelCategory: Partial<ICategoryDTO>) {
    let data = (await this.getTasks()).filter(s => s.id_category === modelCategory.id);

    if (data.length > 0) {
      if (action === actionDb.update) {
        data = data.map(s => {
          s.name_category = modelCategory.name ?? "";
          return s;
        });
      } else {

        data = data.map(s => {
          s.name_category = null;
          s.id_category = null;
          return s;
        })
      }

      await this.updateTask(data);
       const version = await this.getVersionDB();
      this.systemVersion(version + 1);
     

    }
  }
}
