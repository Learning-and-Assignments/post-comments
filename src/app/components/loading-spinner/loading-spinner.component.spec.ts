import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { By } from '@angular/platform-browser';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingSpinnerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the loading spinner component', () => {
    expect(component).toBeTruthy();
  });

  it('should render spinner container and spinner div', () => {
    const container = fixture.debugElement.query(By.css('.spinner-container'));
    const spinner = fixture.debugElement.query(By.css('.spinner'));
    expect(container).toBeTruthy();
    expect(spinner).toBeTruthy();
  });
});