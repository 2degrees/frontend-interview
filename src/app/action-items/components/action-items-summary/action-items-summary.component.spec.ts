import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionItemsSummaryComponent } from './action-items-summary.component';

describe('ActionItemsSummaryComponent', () => {
  let component: ActionItemsSummaryComponent;
  let fixture: ComponentFixture<ActionItemsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionItemsSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionItemsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
