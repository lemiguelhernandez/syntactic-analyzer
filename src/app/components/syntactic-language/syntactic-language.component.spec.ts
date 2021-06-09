import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyntacticLanguageComponent } from './syntactic-language.component';

describe('SyntacticLanguageComponent', () => {
  let component: SyntacticLanguageComponent;
  let fixture: ComponentFixture<SyntacticLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SyntacticLanguageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyntacticLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
