import { TestBed } from '@angular/core/testing';
import { SplashPage } from './splash.page';
import { Router } from '@angular/router';

describe('SplashPage', () => {
  let component: SplashPage;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SplashPage],
      providers: [
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(SplashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /todo-list after timer', (done) => {
    // Usamos un timer corto para no esperar 3.5s en el test
    setTimeout(() => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/todo-list'], { replaceUrl: true });
      done();
    }, 3600);
  });
});
