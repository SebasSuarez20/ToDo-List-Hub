import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItem, IonLabel, IonCheckbox, IonButton, IonIcon,
  IonInput, IonItemSliding, IonItemOptions, IonItemOption, IonTextarea
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  trashOutline, add, checkmarkCircle, ellipseOutline,
  listOutline, createOutline, checkmark, documentTextOutline, addCircleOutline, gridOutline
} from 'ionicons/icons';
import { debounceTime, Subject, takeUntil, tap } from 'rxjs';
import { TaskModelDTO } from 'src/app/model/dto/ItaskDTO';
import { DatabaseServiceTask } from 'src/app/services/dbTask/database.service';
import { TaskListPage } from "src/app/component/task-list/task-list/task-list.page";
import { LoggerService } from 'src/app/services/logger/logger.service';
import { ActionCrudToDoList } from 'src/app/services/ToDoList-actions/action-crud-to-do-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.page.html',
  styleUrls: ['todo-list.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonCheckbox, IonButton,
    IonIcon, IonInput, IonItemSliding, IonItemOptions, IonItemOption, IonTextarea,
    RouterLink, ReactiveFormsModule, CommonModule,
    TaskListPage
  ],
})
export class TodoListPage {

  public taskInformation: TaskModelDTO[] = [];
  public taskInformationComplete: TaskModelDTO[] = [];
  public isLoading = this.crudTask.isLoading;
  private destroy$ = new Subject<void>();
  public isAllTask:boolean = true;
  public formTask: FormGroup;

  constructor(private readonly database: DatabaseServiceTask, 
    private readonly fb: FormBuilder, 
    private readonly logger: LoggerService,
  private readonly crudTask:ActionCrudToDoList) {
    addIcons({
      trashOutline, add, checkmarkCircle, ellipseOutline,
      listOutline, createOutline, checkmark, documentTextOutline, addCircleOutline, gridOutline
    });

    this.formTask = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['']
    });
  }

  get getTask(): Promise<TaskModelDTO[]> {
    return this.database.getTasks();
  }

  ionViewWillEnter(): void {
    this.listeningTask();
    this.loadInformationInit();
  }

  ionViewWillLeave() {
    this.destroy$.next();
  }

  public listeningTask(): void {

    this.database.storageListening().
      pipe(
        takeUntil(this.destroy$),
        tap(() => this.crudTask.loadingUpdate(true)),
        debounceTime(1700)
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.taskInformation = res;
          this.crudTask.loadingUpdate(false);
        }, error: (err) => {
          this.logger.error("Error: ", `${err}`);
        }
      });

  }

  private async loadInformationInit() {
    this.taskInformation = await this.database.getTasks();
    this.crudTask.timeSkeleton();
  }

  public async insertAsyncTask(): Promise<void> {
    this.crudTask.insertTask(this.formTask);
  }

  public updateAsyncTask(event: { id: string, complete: boolean }): void {
     this.crudTask.updateTask(event);
  }

  public viewInformationComplete(): void {
    const data = [...this.taskInformation].filter(s => s.is_completed == true);
    this.taskInformationComplete = data;
    this.isAllTask = false;
    
  }

  public async deleteAsyncTask(event: string) {
     this.crudTask.deleteTask(event);
  }
}
