import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItem, IonLabel, IonCheckbox, IonButton, IonIcon,
  IonInput, IonItemSliding, IonItemOptions, IonItemOption, IonTextarea, IonSkeletonText
} from '@ionic/angular/standalone';
import { TaskModelDTO } from 'src/app/model/dto/ItaskDTO';
import { LoadingSkeletonComponent } from '../../loading/loading-skeleton/loading-skeleton.component';
import { CategoryPickerComponent } from '../../category-picker/category-picker/category-picker.component';
import { DatabaseServiceCategory } from 'src/app/services/dbCategory/database.service';
import { ICategoryDTO } from 'src/app/model/dto/IcategoryDTO';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonCheckbox, IonButton,
    IonIcon, IonInput, IonItemSliding, IonItemOptions, IonItemOption, IonTextarea, IonSkeletonText,
    RouterLink, CommonModule,LoadingSkeletonComponent,CategoryPickerComponent
  ],
  
})
export class TaskListPage  {


  @Input() taskInformation: TaskModelDTO[] = [];
  @Input() isLoading: boolean = true;
  @Output() addTask = new EventEmitter<{ id: string, complete: boolean }>();
  @Output() deleteTask = new EventEmitter<string>();
  @Output() assignedId = new EventEmitter<Partial<ICategoryDTO>>();
  public informationCategory:Partial<ICategoryDTO>[] = [];

  // State for Side Panel
  public showSidePanel: boolean = false;

  constructor(private databaseCategory:DatabaseServiceCategory) { 
      
  }

  public async loadInitCategory(element:TaskModelDTO){
    this.informationCategory = (await this.databaseCategory.getCategory()).map(s => {
      return { ...s, idTask: element.id }
    });
     console.log(this.informationCategory);
  }

  public async toggleSidePanel(element:TaskModelDTO) {
    await this.loadInitCategory(element);
    this.showSidePanel = !this.showSidePanel;
  }

  public updateAsyncTask(id: string, complete: boolean) {
     if(id === null || id === "") throw new Error("Error: no se encontro correctamente la tarea.");
    this.addTask.emit({
      complete: !complete,
      id: id
    });
  }

  public deleteAsyncTask(id:string){
    if(id === null || id ==="") throw new Error("Error: no se encontro el id la tarea.");
    this.deleteTask.emit(id);
  }

  public assignedCategory(event:Partial<ICategoryDTO>):void{
     this.assignedId.emit(event);
  }
  

}
