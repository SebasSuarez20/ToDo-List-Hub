import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a success method', () => {
    expect(typeof service.success).toBe('function');
  });

  it('should have an error method', () => {
    expect(typeof service.error).toBe('function');
  });

  it('should have a warning method', () => {
    expect(typeof service.warning).toBe('function');
  });

  it('should have a confirm method', () => {
    expect(typeof service.confirm).toBe('function');
  });

  it('should have a confirmDelete method', () => {
    expect(typeof service.confirmDelete).toBe('function');
  });
});
