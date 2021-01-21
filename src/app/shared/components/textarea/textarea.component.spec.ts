import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { EComponentType } from 'src/app/shared/enums/componentType.enum';
import { ComponentService } from 'src/app/shared/services/component.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import Spy = jasmine.Spy;
import { TextareaComponent } from 'src/app/shared/components/textarea/textarea.component';

describe('Test Textarea Component', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;
  let componentService: ComponentService;
  let spyGetId: Spy;
  let spyGetName: Spy;

  const testStore = {
    dispatch: jasmine.createSpy('dispatch'),
    select: jasmine.createSpy('select').and.returnValue(of({ styles: {
        placeholder: 'Text area',
        width: 300,
        height: 100,
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
      declarations: [ TextareaComponent ],
      providers: [
        { provide: Store, useValue: testStore },
        ComponentService,
        ValidatorService
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(TextareaComponent);
    componentService = fixture.debugElement.injector.get(ComponentService);
    component = fixture.componentInstance;
    spyGetId = spyOn(componentService, 'getId').and.returnValue(1);
    spyGetName = spyOn(componentService, 'getName').and.returnValue(of('Textarea'));
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

  it('component type should be a textarea', () => {
    expect(component.ComponentType).toEqual(EComponentType.Textarea);
  });

  it('should render placeholder', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('textarea').placeholder)
      .toContain(component.styles.placeholder);
  });
});
