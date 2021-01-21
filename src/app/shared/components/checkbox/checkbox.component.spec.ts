import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { EComponentType } from 'src/app/shared/enums/componentType.enum';
import { ComponentService } from 'src/app/shared/services/component.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import Spy = jasmine.Spy;
import { EAlignType } from 'src/app/shared/enums/align.enum';
import { CheckboxComponent } from 'src/app/shared/components/checkbox/checkbox.component';

describe('Test Button Component', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let componentService: ComponentService;
  let spyGetId: Spy;
  let spyGetName: Spy;

  const testStore = {
    dispatch: jasmine.createSpy('dispatch'),
    select: jasmine.createSpy('select').and.returnValue(of({ styles: {
        placeholder: 'Checkbox',
        width: 15,
        height: 15,
        marginTop: 5,
        required: true,
        fontSize: 18,
        fontWeight: 400,
        color: '#000',
        bgColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
        align: EAlignType.Left
      }}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxComponent ],
      providers: [
        { provide: Store, useValue: testStore },
        ComponentService,
        ValidatorService
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(CheckboxComponent);
    componentService = fixture.debugElement.injector.get(ComponentService);
    component = fixture.componentInstance;
    spyGetId = spyOn(componentService, 'getId').and.returnValue(1);
    spyGetName = spyOn(componentService, 'getName').and.returnValue(of('Checkbox'));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not create ui component if template', () => {
    component.isTemplate = true;
    fixture.detectChanges();
    component.componentInit();
    expect(component.id).toBeUndefined();
    expect(component.name).toBeUndefined();
  });

  it('should create ui component if not template', () => {
    component.isTemplate = false;
    fixture.detectChanges();
    component.componentInit();
    expect(component.id).toBeTruthy();
    expect(component.name).toBeTruthy();
  });

  it('should have default styles', () => {
    expect(component.styles).toBeTruthy();
  });

  it('should call componentService', () => {
    component.componentInit();
    expect(spyGetId.calls.any()).toBeTruthy();
    expect(spyGetId.calls.any()).toBeTruthy();
  });

  it('component type should be a checkbox', () => {
    expect(component.ComponentType).toEqual(EComponentType.Checkbox);
  });

  it('should render placeholder', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('label').textContent)
      .toContain(component.styles.placeholder);
  });
});
