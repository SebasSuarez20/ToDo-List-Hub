import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItem, IonLabel, IonCheckbox, IonButton, IonIcon,
  IonInput, IonItemSliding, IonItemOptions, IonItemOption, IonTextarea, IonSkeletonText
} from '@ionic/angular/standalone';
import { TaskModelDTO } from 'src/app/model/dto/ItaskDTO';
import { LoadingSkeletonComponent } from '../../loading/loading-skeleton/loading-skeleton.component';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonCheckbox, IonButton,
    IonIcon, IonInput, IonItemSliding, IonItemOptions, IonItemOption, IonTextarea, IonSkeletonText,
    RouterLink, CommonModule,LoadingSkeletonComponent
  ],
  
})
export class TaskListPage {


  @Input() taskInformation: TaskModelDTO[] = [];
  @Input() isLoading: boolean = true;
  @Output() addTask = new EventEmitter<{ id: string, complete: boolean }>();
  @Output() deleteTask = new EventEmitter<string>();

  constructor() { }

  public updateAsyncTask(id: string, complete: boolean) {
     if(id!== null || id!== "") throw new Error("Error: no se encontro correctamente la tarea.");
    this.addTask.emit({
      complete: !complete,
      id: id
    });
  }

  public deleteAsyncTask(id:string){
    if(id === null || id ==="") throw new Error("Error: no se encontro el id la tarea.");
    this.deleteTask.emit(id);
  }
  

}
