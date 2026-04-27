import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton, IonIcon, IonText } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline, rocketOutline } from 'ionicons/icons';

@Component({
  selector: 'app-not-available',
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonIcon, IonText],
  templateUrl: './not-available.component.html',
  styleUrl: './not-available.component.scss'
})
export class NotAvailableComponent {

  constructor(private router: Router) {
    addIcons({ arrowBackOutline, rocketOutline });
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
