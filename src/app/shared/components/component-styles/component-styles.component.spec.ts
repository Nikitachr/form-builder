import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ComponentStylesComponent } from 'src/app/shared/components/component-styles/component-styles.component';
import { EComponentType } from 'src/app/shared/enums/componentType.enum';
import { EAlignType } from 'src/app/shared/enums/align.enum';

describe('Test component styles component', () => {
  let component: ComponentStylesComponent;
  let fixture: ComponentFixture<ComponentStylesComponent>;

  const testStore = {
    dispatch: jasmine.createSpy('dispatch')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentStylesComponent ],
      providers: [
        { provide: Store, useValue: testStore },
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ComponentStylesComponent);
    component = fixture.componentInstance;
    component.component = {
      id: 1,
      name: 'button',
      componentType: EComponentType.Button,
      styles: {
        placeholder: 'test',
        marginTop: 10,
        fontSize: 16,
        fontWeight: 12,
        color: '#fff',
        align: EAlignType.Left
      },
      editForm: new FormGroup({
        placeholder: new FormControl('', [Validators.required]),
        marginTop: new FormControl('', [Validators.required]),
        fontSize: new FormControl('', [Validators.required]),
        fontWeight: new FormControl('', [Validators.required]),
        color: new FormControl('', [Validators.required]),
        align: new FormControl('', [Validators.required])
      })
    };
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get form', async () => {
    fixture.detectChanges();
    expect(component.form).toBeTruthy();
  });

  it('form should get value from component styles', () => {
    fixture.detectChanges();
    console.log(component.form.value);
    component.ngOnInit();
    expect(component.form.value).toEqual(component.component.styles);
  });

});
