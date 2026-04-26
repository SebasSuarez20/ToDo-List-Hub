import { TestBed } from '@angular/core/testing';

import { ActionCrudToDoList } from './action-crud-to-do-list';

describe('ActionCrudToDoList', () => {
  let service: ActionCrudToDoList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionCrudToDoList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
