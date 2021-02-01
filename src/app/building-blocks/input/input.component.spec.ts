import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from 'src/app/building-blocks/input/input.component';
import { STYLES } from 'src/app/shared/tokens/styles.token';

describe('Test Input Component', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ],
      providers: [{ provide: STYLES, useValue: { placeholder: 'test' } }]
    })
      .compileComponents();
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default styles', () => {
    expect(component.styles).toBeTruthy();
  });

  it('should render placeholder', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input').placeholder)
      .toContain(component.styles.placeholder);
  });
});
