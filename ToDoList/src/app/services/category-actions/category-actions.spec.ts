import { TestBed } from '@angular/core/testing';

import { CategoryActions } from './category-actions';

describe('CategoryActions', () => {
  let service: CategoryActions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryActions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
