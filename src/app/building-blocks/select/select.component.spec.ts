import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponent } from 'src/app/building-blocks/select/select.component';
import { STYLES } from 'src/app/shared/tokens/styles.token';

describe('Test Select Component', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectComponent ],
      providers: [{ provide: STYLES, useValue: { placeholder: 'test' } }]
    })
      .compileComponents();
    fixture = TestBed.createComponent(SelectComponent);
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
    expect(compiled.querySelector('option').textContent)
      .toContain(component.styles.placeholder);
  });
});
