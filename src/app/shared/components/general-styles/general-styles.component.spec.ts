import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { GeneralStylesComponent } from 'src/app/shared/components/general-styles/general-styles.component';

describe('Test general styles component', () => {
  let component: GeneralStylesComponent;
  let fixture: ComponentFixture<GeneralStylesComponent>;

  const testStore = {
    dispatch: jasmine.createSpy('dispatch'),
    select: jasmine.createSpy('select').and.returnValue(of({
        paddingLeft: 10,
        paddingTop: 20,
        backgroundColor: '#fff',
        margins: 10
      }))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralStylesComponent ],
      providers: [
        { provide: Store, useValue: testStore },
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(GeneralStylesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get general styles', () => {
    fixture.detectChanges();
    expect(component.generalStyles).toBeTruthy();
  });

  it('should get form value from general styles',  () => {
    fixture.detectChanges();
    expect(component.form.value).toEqual(component.generalStyles);
  });

  it('should change color',  () => {
    fixture.detectChanges();
    component.colorChange('#fff');
    expect(component.form.get('backgroundColor').value).toBe('#fff');
  });

});
