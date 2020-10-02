import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacexHomeComponent } from './spacex-home.component';

describe('SpacexHomeComponent', () => {
  let component: SpacexHomeComponent;
  let fixture: ComponentFixture<SpacexHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpacexHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacexHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
