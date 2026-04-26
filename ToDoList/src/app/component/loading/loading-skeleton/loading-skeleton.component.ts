import { Component } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItem, IonLabel, IonCheckbox, IonButton, IonIcon,
  IonInput, IonItemSliding, IonItemOptions, IonItemOption, IonTextarea, IonSkeletonText
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-loading-skeleton',
  templateUrl: './loading-skeleton.component.html',
  imports:[ IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonCheckbox, IonButton,
    IonIcon, IonInput, IonItemSliding, IonItemOptions, IonItemOption, IonTextarea, IonSkeletonText],
  standalone:true,
  styleUrls: ['./loading-skeleton.component.scss'],
})
export class LoadingSkeletonComponent  {

  constructor() { }
}
