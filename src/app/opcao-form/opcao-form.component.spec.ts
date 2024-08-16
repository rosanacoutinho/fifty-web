import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcaoFormComponent } from './opcao-form.component';

describe('OpcaoFormComponent', () => {
  let component: OpcaoFormComponent;
  let fixture: ComponentFixture<OpcaoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcaoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
