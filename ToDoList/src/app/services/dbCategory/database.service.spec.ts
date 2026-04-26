import { TestBed } from '@angular/core/testing';
import { DatabaseService } from './database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a createTable method', () => {
    expect(typeof service.createTable).toBe('function');
  });

  it('should have an insertTask method', () => {
    expect(typeof service.insertTask).toBe('function');
  });

  it('should have a getTasks method', () => {
    expect(typeof service.getTasks).toBe('function');
  });

  it('should have an updateTaskStatus method', () => {
    expect(typeof service.updateTaskStatus).toBe('function');
  });

  it('should have a deleteTask method', () => {
    expect(typeof service.deleteTask).toBe('function');
  });
});
