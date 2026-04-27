import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { FeatureService } from './services/feature.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  public isDisplayMaintenance:boolean = false;

  constructor(private firebase:FeatureService) {}

   async ngOnInit() {
    await this.firebase.init(); 
    this.isDisplayMaintenance = this.firebase .getBoolean('maintenance_mode'); 
  }
}
