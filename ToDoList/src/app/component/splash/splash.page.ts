import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { tap, timer } from 'rxjs';

@Component({
  selector: 'app-splash',
  templateUrl: 'splash.page.html',
  styleUrls: ['splash.page.scss'],
  imports: [IonContent],
})
export class SplashPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.redirectToTodoList();
  }

  public redirectToTodoList() {
    timer(3500).pipe(tap(() => {
      this.router.navigate(['/todo-list'], { replaceUrl: true });
    })).subscribe();
  }
}
