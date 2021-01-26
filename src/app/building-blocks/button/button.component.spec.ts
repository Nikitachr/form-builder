import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { EComponentType } from 'src/app/shared/enums/component-type.enum';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import Spy = jasmine.Spy;
import { ButtonComponent } from 'src/app/building-blocks/button/button.component';
import { EAlignType } from 'src/app/shared/enums/align.enum';

describe('Test Button Component', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  const testStore = {
    dispatch: jasmine.createSpy('dispatch'),
    select: jasmine.createSpy('select').and.returnValue(of({styles: {
        placeholder: 'Button',
        width: 70,
        height: 36,
        marginTop: 5,
        required: true,
        fontSize: 20,
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
      declarations: [ ButtonComponent ],
      providers: [
        { provide: Store, useValue: testStore },
        ValidatorService
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not create ui component if template', () => {
    component.isTemplate = true;
    fixture.detectChanges();
    component.componentInit();
    expect(component.index).toBeUndefined();
    expect(component.name).toBeUndefined();
  });

  it('should create ui component if not template', () => {
    component.isTemplate = false;
    fixture.detectChanges();
    component.componentInit();
    expect(component.index).toBeTruthy();
    expect(component.name).toBeTruthy();
  });

  it('should have default styles', () => {
    expect(component.styles).toBeTruthy();
  });

  it('component type should be a button', () => {
    expect(component.ComponentType).toEqual(EComponentType.Button);
  });

  it('should render placeholder', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent)
      .toContain(component.styles.placeholder);
  });
});
