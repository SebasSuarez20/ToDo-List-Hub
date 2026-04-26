import { TestBed } from '@angular/core/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call console.log on log()', () => {
    const spy = spyOn(console, 'log');
    service.log('TestComponent', 'mensaje de prueba');
    expect(spy).toHaveBeenCalled();
  });

  it('should call console.warn on warn()', () => {
    const spy = spyOn(console, 'warn');
    service.warn('TestComponent', 'advertencia de prueba');
    expect(spy).toHaveBeenCalled();
  });

  it('should call console.error on error()', () => {
    const spy = spyOn(console, 'error');
    service.error('TestComponent', 'error de prueba');
    expect(spy).toHaveBeenCalled();
  });
});
