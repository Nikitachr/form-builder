import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaComponent } from 'src/app/building-blocks/textarea/textarea.component';
import { STYLES } from 'src/app/shared/tokens/styles.token';

describe('Test Textarea Component', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextareaComponent ],
      providers: [{ provide: STYLES, useValue: { placeholder: 'test' } }]
    })
      .compileComponents();
    fixture = TestBed.createComponent(TextareaComponent);
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
    expect(compiled.querySelector('textarea').placeholder)
      .toContain(component.styles.placeholder);
  });
});
