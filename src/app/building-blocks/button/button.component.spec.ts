import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from 'src/app/building-blocks/button/button.component';
import { STYLES } from 'src/app/shared/tokens/styles.token';

describe('Test Button Component', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ],
      providers: [{ provide: STYLES, useValue: { placeholder: 'test' } }]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ButtonComponent);
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
    expect(compiled.querySelector('button').textContent)
      .toContain(component.styles.placeholder);
  });
});
