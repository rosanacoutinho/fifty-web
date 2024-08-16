import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcaoListComponent } from './opcao-list.component';

describe('OpcaoListComponent', () => {
  let component: OpcaoListComponent;
  let fixture: ComponentFixture<OpcaoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcaoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcaoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
