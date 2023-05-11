/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NyaButtonComponent } from './nya-button.component';

describe('NyaButtonComponent', () => {
  let component: NyaButtonComponent;
  let fixture: ComponentFixture<NyaButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NyaButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NyaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
