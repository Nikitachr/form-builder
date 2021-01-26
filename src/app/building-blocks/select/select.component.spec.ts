import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { EComponentType } from 'src/app/shared/enums/component-type.enum';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import Spy = jasmine.Spy;
import { EAlignType } from 'src/app/shared/enums/align.enum';
import { SelectComponent } from 'src/app/building-blocks/select/select.component';

describe('Test Select Component', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  const testStore = {
    dispatch: jasmine.createSpy('dispatch'),
    select: jasmine.createSpy('select').and.returnValue(of({ styles: {
        placeholder: 'Select',
        width: 100,
        height: 36,
        marginTop: 5,
        required: true,
        fontSize: 18,
        fontWeight: 400,
        color: '#000',
        bgColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        align: EAlignType.Center
      }}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectComponent ],
      providers: [
        { provide: Store, useValue: testStore },
        ValidatorService
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not create ui component if template', () => {
    component.isTemplate = true;
    fixture.detectChanges();
    component.componentInit();
    expect(component.name).toBeUndefined();
  });

  it('should create ui component if not template', () => {
    component.isTemplate = false;
    fixture.detectChanges();
    component.componentInit();
    expect(component.name).toBeTruthy();
  });

  it('should have default styles', () => {
    expect(component.styles).toBeTruthy();
  });

  it('should call componentService', () => {
    component.componentInit();
  });

  it('component type should be a Select', () => {
    expect(component.ComponentType).toEqual(EComponentType.Select);
  });

  it('should render placeholder', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('option').textContent)
      .toContain(component.styles.placeholder);
  });
});
