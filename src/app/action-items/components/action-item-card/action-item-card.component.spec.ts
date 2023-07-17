import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionItemCardComponent } from './action-item-card.component';
import { Component, DebugElement, Input } from '@angular/core';
import { ActionItem, ActionItemsGrouping } from '../../action-items.models';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/app.config';
import { By } from '@angular/platform-browser';
import { setActionStage } from '../../state/action-items.actions';

const actionItemFixture: ActionItem = {
  id: 'action-a',
  title: 'Replace boiler',
  costSaving: 500000,
  paybackMonths: 3,
};

describe('ActionItemCardComponent', () => {
  let fixture: ComponentFixture<ActionItemCardHost>;
  let page: ActionItemPage;

  let mockStore: MockStore<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionItemCardHost, ActionItemCardComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionItemCardComponent);
    page = new ActionItemPage(fixture);

    mockStore = TestBed.inject(MockStore);
  });

  function setHostInput<Input extends keyof ActionItemCardHost>(
    name: Input,
    value: ActionItemCardHost[Input]
  ): void {
    fixture.componentRef.setInput(name, value);
  }

  describe('Data rendering', () => {
    beforeEach(() => {
      setHostInput('stage', 'pending');
      setHostInput('actionItem', actionItemFixture);
      fixture.detectChanges();
    });

    it('should render the title', () => {
      expect(page.getTextContentByTestId('title')).toBe(
        actionItemFixture.title
      );
    });

    describe('cost savings', () => {
      it('should render a cost in US$ < 1000 as is', () => {
        setCost(999);
        assertCost('US$999');
      });

      it('should render a cost in US$ 1000 as US$1k', () => {
        setCost(1000);
        assertCost('US$1k');
      });

      it('should render use up to 3 significant digits', () => {
        setCost(12345);
        assertCost('US$12.3k');
      });

      it('should render millions of US$', () => {
        setCost(1_000_000);
        assertCost('US$1m');
      });

      it('should render 1000s of millions of US$', () => {
        setCost(1_000_000_000);
        assertCost('US$1,000m');
      });

      function setCost(value: number): void {
        setHostInput('actionItem', { ...actionItemFixture, costSaving: value });
        fixture.detectChanges();
      }

      function assertCost(expectedCostString: string): void {
        expect(page.getTextContentByTestId('cost-saving')).toBe(
          expectedCostString
        );
      }
    });

    describe('payback period', () => {
      it('should cater for 1 month', () => {
        setPaybackPeriod(1);
        assertPaybackPeriod('1m');
      });

      it('should cater for 11 months', () => {
        setPaybackPeriod(11);
        assertPaybackPeriod('11m');
      });

      it('should display 12 months as 1y', () => {
        setPaybackPeriod(12);
        assertPaybackPeriod('1y');
      });

      it('should cater for partial years', () => {
        setPaybackPeriod(30);
        assertPaybackPeriod('2y, 6m');
      });

      function setPaybackPeriod(months: number): void {
        setHostInput('actionItem', {
          ...actionItemFixture,
          paybackMonths: months,
        });
        fixture.detectChanges();
      }

      function assertPaybackPeriod(expectedPaybackPeriod: string): void {
        expect(page.getTextContentByTestId('payback-period')).toBe(
          expectedPaybackPeriod
        );
      }
    });
  });

  describe('Actions', () => {
    describe('pending stage', () => {
      beforeEach(() => {
        setHostInput('actionItem', actionItemFixture);
        fixture.componentRef.setInput('stage', 'pending');
        fixture.detectChanges();
      });

      it('should not display a previous action', () => {
        expect(page.previousAction).toBe(null);
      });

      it('should display a next action', () => {
        expect(page.nextAction).toBeTruthy();
      });

      it('should move to the "inProgress stage when next is clicked', () => {
        jest.spyOn(mockStore, 'dispatch');

        page.clickOn(page.nextAction!);
        fixture.detectChanges();

        expect(mockStore.dispatch).toHaveBeenCalledWith(
          setActionStage({ action: actionItemFixture, stage: 'inProgress' })
        );
      });
    });

    describe('in progress stage', () => {
      beforeEach(() => {
        setHostInput('actionItem', actionItemFixture);
        fixture.componentRef.setInput('stage', 'inProgress');
        fixture.detectChanges();
      });

      it('should display a previous action', () => {
        expect(page.previousAction).toBeTruthy();
      });

      it('should move to the "pending" stage when previous is clicked', () => {
        jest.spyOn(mockStore, 'dispatch');

        page.clickOn(page.previousAction!);
        fixture.detectChanges();

        expect(mockStore.dispatch).toHaveBeenCalledWith(
          setActionStage({ action: actionItemFixture, stage: 'pending' })
        );
      });

      it('should display a next action', () => {
        expect(page.nextAction).toBeTruthy();
      });

      it('should move to the "complete stage when next is clicked', () => {
        jest.spyOn(mockStore, 'dispatch');

        page.clickOn(page.nextAction!);
        fixture.detectChanges();

        expect(mockStore.dispatch).toHaveBeenCalledWith(
          setActionStage({ action: actionItemFixture, stage: 'complete' })
        );
      });
    });

    describe('complete stage', () => {
      beforeEach(() => {
        setHostInput('actionItem', actionItemFixture);
        fixture.componentRef.setInput('stage', 'complete');
        fixture.detectChanges();
      });

      it('should display a previous action', () => {
        expect(page.previousAction).toBeTruthy();
      });

      it('should move to the "inProgress" stage when previous is clicked', () => {
        jest.spyOn(mockStore, 'dispatch');

        page.clickOn(page.previousAction!);
        fixture.detectChanges();

        expect(mockStore.dispatch).toHaveBeenCalledWith(
          setActionStage({ action: actionItemFixture, stage: 'inProgress' })
        );
      });

      it('should not display a next action', () => {
        expect(page.nextAction).toBe(null);
      });
    });
  });
});

@Component({
  selector: 'card-host',
  template: `<fi-action-item-card [actionItem]="actionItem" [stage]="stage" />`,
  standalone: true,
  imports: [ActionItemCardComponent],
})
class ActionItemCardHost {
  @Input() actionItem!: ActionItem;
  @Input() stage!: keyof ActionItemsGrouping;
}

class ActionItemPage {
  constructor(private readonly fixture: ComponentFixture<ActionItemCardHost>) {}

  getElementByTestId(
    testId: string,
    failIfNotFound = true
  ): DebugElement | null {
    const element = this.fixture.debugElement.query(
      By.css(`[data-testid="${testId}"]`)
    );
    if (!element && failIfNotFound) {
      throw new Error(`Could not find element for test ID: "${testId}"!`);
    }
    return element ?? null;
  }

  getTextContentByTestId(testId: string, failIfNotFound = true): string | null {
    return (
      this.getElementByTestId(testId, failIfNotFound)?.nativeElement
        .textContent ?? null
    );
  }

  clickOn(element: DebugElement): void {
    element.triggerEventHandler('click', {});
  }

  get previousAction(): DebugElement | null {
    return this.getElementByTestId('previous-action', false);
  }

  get nextAction(): DebugElement | null {
    return this.getElementByTestId('next-action', false);
  }
}
