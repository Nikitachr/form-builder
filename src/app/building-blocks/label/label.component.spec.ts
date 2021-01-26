import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { EComponentType } from 'src/app/shared/enums/component-type.enum';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import Spy = jasmine.Spy;
import { EAlignType } from 'src/app/shared/enums/align.enum';
import { LabelComponent } from 'src/app/building-blocks/label/label.component';

describe('Test Label Component', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;

  const testStore = {
    dispatch: jasmine.createSpy('dispatch'),
    select: jasmine.createSpy('select').and.returnValue(of({styles: {
        placeholder: 'Label',
        marginTop: 5,
        fontSize: 18,
        fontWeight: 400,
        color: '#000',
        align: EAlignType.Left
      }}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelComponent ],
      providers: [
        { provide: Store, useValue: testStore },
        ValidatorService
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LabelComponent);
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

  it('component type should be a label', () => {
    expect(component.ComponentType).toEqual(EComponentType.Label);
  });

  it('should render placeholder', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span').textContent)
      .toContain(component.styles.placeholder);
  });
});
