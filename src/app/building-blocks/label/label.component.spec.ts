import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelComponent } from 'src/app/building-blocks/label/label.component';
import { STYLES } from 'src/app/shared/tokens/styles.token';

describe('Test Label Component', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelComponent ],
      providers: [{ provide: STYLES, useValue: { placeholder: 'test' } }]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LabelComponent);
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
    expect(compiled.querySelector('span').textContent)
      .toContain(component.styles.placeholder);
  });
});
