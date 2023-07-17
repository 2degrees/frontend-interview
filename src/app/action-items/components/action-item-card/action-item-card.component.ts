import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionItem,
  type ActionItemsGrouping,
} from '../../action-items.models';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.config';
import { setActionStage } from '../../state/action-items.actions';

type Stage = keyof ActionItemsGrouping;

@Component({
  selector: 'fi-action-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-item-card.component.html',
  styleUrls: ['./action-item-card.component.css'],
})
export class ActionItemCardComponent implements OnChanges {
  @Input() actionItem!: ActionItem;
  @Input() stage!: Stage;

  private readonly currencyFormatter = Intl.NumberFormat('en-GB', {
    currency: 'USD',
    style: 'currency',
    maximumSignificantDigits: 3,
  });

  previousStage: Stage | null = null;
  nextStage: Stage | null = null;

  constructor(private readonly store: Store<AppState>) {}

  ngOnChanges(changes: SimpleChanges): void {
    const newStage: Stage | undefined = changes['stage']?.currentValue;

    switch (newStage) {
      case 'pending':
        this.previousStage = null;
        this.nextStage = 'inProgress';
        break;
      case 'inProgress':
        this.previousStage = 'pending';
        this.nextStage = 'complete';
        break;
      case 'complete':
        this.previousStage = 'inProgress';
        this.nextStage = null;
        break;
      default:
        this.previousStage = null;
        this.nextStage = null;
    }
  }

  formatPaybackPeriod(paybackMonths: number): string {
    if (paybackMonths < 12) {
      return `${paybackMonths}m`;
    } else {
      const years = Math.floor(paybackMonths / 12);
      const months = paybackMonths % 12;
      return `${years}y, ${months}m`;
    }
  }

  formatCostSaving(cost: number): string {
    const exponent = Math.log10(cost);
    if (exponent < 3) {
      return this.currencyFormatter.format(cost);
    } else if (exponent < 6) {
      return `${this.currencyFormatter.format(cost / 1000)}k`;
    } else {
      return `${this.currencyFormatter.format(cost / 1000 / 1000)}m`;
    }
  }

  gotoPreviousStage(): void {
    if (!this.previousStage) {
      throw new Error('No previous stage to go to!');
    }
    this.store.dispatch(
      setActionStage({ action: this.actionItem, stage: this.previousStage })
    );
  }

  gotoNextStage(): void {
    if (!this.nextStage) {
      throw new Error('No next stage to go to!');
    }
    this.store.dispatch(
      setActionStage({ action: this.actionItem, stage: this.nextStage })
    );
  }
}
