import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserSearchComponent } from './list-user-search.component';

describe('ListUserSearchComponent', () => {
  let component: ListUserSearchComponent;
  let fixture: ComponentFixture<ListUserSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
