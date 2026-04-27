import { Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TaskModelDTO } from 'src/app/model/dto/ItaskDTO';
import { DatabaseServiceTask } from '../dbTask/database.service';
import { AlertService } from '../alert/alert.service';
import { LoggerService } from '../logger/logger.service';
import { taskModel } from 'src/app/model/taskModel';
import { BehaviorSubject, timer } from 'rxjs';
import { ICategoryDTO } from 'src/app/model/dto/IcategoryDTO';
import { ITaskStorageDTO } from 'src/app/model/dto/ITaskStorageDto';

@Injectable({
  providedIn: 'root',
})
export class ActionCrudToDoList {

  public isLoading = signal(true);
   public data$ = new BehaviorSubject<Partial<ITaskStorageDTO> | null>(null);
  

  constructor(
    private readonly database: DatabaseServiceTask,
    private alert: AlertService,
    private logger: LoggerService) { }

  get getTask(): Promise<TaskModelDTO[]> {
    return this.database.getTasks();
  }

  public timeSkeleton(): void {
    timer(2200).subscribe({
      next: () => {
        this.isLoading.set(false);
      }
    })
  }

  public async insertTask(formTask: FormGroup): Promise<void> {

    if (formTask.valid) {
      try {
        const { title, description } = formTask.value;

        const validatorUniqueTask = (await this.getTask).
          some(s => s.title.trim().toLocaleLowerCase() == title.trim().toLocaleLowerCase());

        if (validatorUniqueTask) throw new Error("Tarea ya existente");
        const information = new taskModel().setDescription(description).setTitle(title).build();
        this.database.insertTask(information as unknown as TaskModelDTO).then(() => formTask.reset({ emitEvent: false }));
        this.alert.success("Excelente", "Se creo correctamente la tarea.", 1500);
        this.timeSkeleton();
      } catch (err) {
        this.alert.error("Error", `${err}`);
        this.logger.error("Error: ", `${err}`);
        this.isLoading.set(false);
      }
    } else {
      this.alert.error("Error", "Tiene campos incorrectos..");
       this.isLoading.set(false);
    }
  }

  public updateTask(event: { id: string, complete: boolean }): void {
     try{

      if(event.id === null || event.id === "") throw new Error("no se encontro el id correspondiente.");

      const { id, complete } = event;
    this.database.updateTaskStatus(id, complete);
     }catch(err){
       this.alert.error("Error", `${err}`);
       this.isLoading.set(false);
     }
  }

   public async deleteTask(event: string) {
    try {
      if(event === null || event === "") throw new Error("no se encontro el id correspondiente.");
      this.isLoading.set(true);
      await this.database.deleteTask(event);
      this.alert.success("Excelente", "Se elimino correctamente la tarea.", 1500);
      this.timeSkeleton();
    } catch (err) {
      this.alert.error("Error", "No se elimino correctamente la tarea.");
      this.logger.error("Error: ", `${err}`);
    }
  }

  public loadingUpdate(value: boolean) {
    this.isLoading.set(value);
  }

  public async assignedCategory(event: Partial<ICategoryDTO & { idTask: string }>) {
    try {
      const { idTask, id, name } = event;
      await this.database.updateTaskAssigned(idTask ?? "", id ?? "", name ?? "");
    } catch (err) {
      this.logger.error('Error: ', `${err}`);
    }

  }

  public updateVersionTask(model:Partial<ITaskStorageDTO>){
      const version = this.getVersionTask();
      model.version = version;
      this.data$.next(model);
  }

  public getVersionTask() : number{
     return (this.data$.value?.version ?? 0) + 1;
  }

  public dataInitialObservableVersion(){
    return this.data$.value?.data ?? [];
  }

   

}
