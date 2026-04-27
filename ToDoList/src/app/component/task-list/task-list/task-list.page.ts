import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonList,
  IonItem, IonLabel, IonCheckbox, IonButton, IonIcon,
  IonInput, IonItemSliding, IonItemOptions, IonItemOption, IonTextarea, IonSkeletonText, IonPopover, IonContent
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  listOutline, bookmarkOutline, chevronForwardOutline, trashOutline, chevronBackOutline,
  filterOutline, chevronDownOutline, rocketOutline, briefcaseOutline, cartOutline, personOutline
} from 'ionicons/icons';
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
    IonIcon, IonInput, IonItemSliding, IonItemOptions, IonItemOption, IonTextarea, IonSkeletonText, IonPopover, IonContent,
    RouterLink, CommonModule, LoadingSkeletonComponent, CategoryPickerComponent
  ],

})
export class TaskListPage {


  @Input() taskInformation: TaskModelDTO[] = [];
  @Input() taskInformationCopy: TaskModelDTO[] = [];
  @Input() isLoading: boolean = true;
  @Output() addTask = new EventEmitter<{ id: string, complete: boolean }>();
  @Output() deleteTask = new EventEmitter<string>();
  @Output() assignedId = new EventEmitter<Partial<ICategoryDTO>>();
  public informationCategory: Partial<ICategoryDTO>[] = [];
  public selectedCategoryId: string | null = null;
  public selectedCategoryName: string = 'Todas';

  // State for Side Panel
  public showSidePanel: boolean = false;

  constructor(private databaseCategory: DatabaseServiceCategory) {
    addIcons({
      listOutline, bookmarkOutline, chevronForwardOutline, trashOutline, chevronBackOutline,
      filterOutline, chevronDownOutline, rocketOutline, briefcaseOutline, cartOutline, personOutline
    });
    this.loadAllCategories();
  }

  private async loadAllCategories() {
    this.informationCategory = await this.databaseCategory.getCategory();
  }

  public async loadInitCategory(element: TaskModelDTO | null) {
    this.informationCategory = (await this.databaseCategory.getCategory()).map(s => {
      return element != null ? { ...s, idTask: element.id } : s;
    });

  }

  public async toggleSidePanel(element: TaskModelDTO) {
    await this.loadInitCategory(element);
    this.showSidePanel = !this.showSidePanel;
  }

  public updateAsyncTask(id: string, complete: boolean) {
    if (id === null || id === "") throw new Error("no se encontro correctamente la tarea.");
    this.addTask.emit({
      complete: !complete,
      id: id
    });
  }

  public deleteAsyncTask(id: string) {
    if (id === null || id === "") throw new Error(" no se encontro el id la tarea.");
    this.deleteTask.emit(id);
  }

  public assignedCategory(event: Partial<ICategoryDTO>): void {
    this.assignedId.emit(event);
  }


  public filterInformationForCategory(id: string | undefined | null) {
    this.selectedCategoryId = id || null;
    let filterData = [...this.taskInformationCopy];

    if (!id) {
      this.taskInformation = filterData;
      return;
    }

    this.taskInformation = filterData.filter(s => s.id_category === id);
  }


}
