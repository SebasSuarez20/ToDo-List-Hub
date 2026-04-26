import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItem, IonLabel, IonCheckbox, IonButton, IonIcon,
  IonInput
} from '@ionic/angular/standalone';
import { ICategoryDTO } from 'src/app/model/dto/IcategoryDTO';
import { DatabaseServiceCategory } from 'src/app/services/dbCategory/database.service';

@Component({
  selector: 'app-category-picker',
  templateUrl: './category-picker.component.html',
  imports:[  IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonCheckbox, IonButton,
    IonIcon, IonInput],
  styleUrls: ['./category-picker.component.scss'],
})
export class CategoryPickerComponent implements OnInit {

  @Input() IsvisiblityPanel!:boolean;
  @Input() informationCategory:Partial<ICategoryDTO>[] = [];
  @Output() assignedId = new EventEmitter<Partial<ICategoryDTO>>();
  
  constructor() { }
  ngOnInit(): void {
    console.log(this.informationCategory);
  }

  public assigned(element:Partial<ICategoryDTO>){
    this.assignedId.emit(element);
    this.IsvisiblityPanel = false;
  }


  public closePanel():void{
    this.IsvisiblityPanel = false;
  }

}
