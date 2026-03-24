import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMyleaveFormComponent } from './add-myleave-form.component';

describe('AddMyleaveFormComponent', () => {
  let component: AddMyleaveFormComponent;
  let fixture: ComponentFixture<AddMyleaveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMyleaveFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMyleaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
