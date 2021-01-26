import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { EComponentType } from 'src/app/shared/enums/component-type.enum';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import Spy = jasmine.Spy;
import { InputComponent } from 'src/app/building-blocks/input/input.component';

describe('Test Input Component', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  const testStore = {
    dispatch: jasmine.createSpy('dispatch'),
    select: jasmine.createSpy('select').and.returnValue(of({styles: {
        width: 300,
        placeholder: 'Input',
        height: 36,
        paddingTop: 10,
        paddingLeft: 10,
        marginTop: 5,
        required: true,
        fontSize: 18,
        fontWeight: 400,
        color: '#000',
        bgColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000'
      }}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ],
      providers: [
        { provide: Store, useValue: testStore },
        ValidatorService
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(InputComponent);
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

  it('component type should be a checkbox', () => {
    expect(component.ComponentType).toEqual(EComponentType.Input);
  });

  it('should render placeholder', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input').placeholder)
      .toContain(component.styles.placeholder);
  });
});
