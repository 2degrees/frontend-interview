import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.config';
import { selectActionItems } from '../../state/action-items.selectors';
import { setActions } from '../../state/action-items.actions';
import { ActionItemCardComponent } from '../action-item-card/action-item-card.component';
import { ActionItem } from '../../action-items.models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fi-action-items-stages',
  standalone: true,
  imports: [CommonModule, ActionItemCardComponent],
  templateUrl: './action-items-stages.component.html',
  styleUrls: ['./action-items-stages.component.css'],
})
export class ActionItemsStagesComponent implements OnInit {
  readonly pendingItems$ = this.store.pipe(
    select(selectActionItems('pending'))
  );
  readonly pendingCount$ = this.pendingItems$.pipe(
    map((items) => items.length)
  );

  readonly inProgressItems$ = this.store.pipe(
    select(selectActionItems('inProgress'))
  );
  readonly inProgressCount$ = this.inProgressItems$.pipe(
    map((items) => items.length)
  );

  readonly completeItems$ = this.store.pipe(
    select(selectActionItems('complete'))
  );
  readonly completeCount$ = this.completeItems$.pipe(
    map((items) => items.length)
  );

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(
      setActions({
        actions: {
          pending: [
            {
              id: 'action-a',
              title: 'Replace boiler',
              costSaving: 500000,
              paybackMonths: 3,
            },
            {
              id: 'action-b',
              title: 'Check for leaks',
              costSaving: 1000000,
              paybackMonths: 9,
            },
            {
              id: 'action-c',
              title: 'Install GSH',
              costSaving: 2500000,
              paybackMonths: 30,
            },
          ],
          inProgress: [
            {
              id: 'action-d',
              title: 'Lag pipes',
              costSaving: 300000,
              paybackMonths: 2,
            },
            {
              id: 'action-e',
              title: 'Use green hydrogen',
              costSaving: 2000000,
              paybackMonths: 12,
            },
          ],
          complete: [
            {
              id: 'action-f',
              title: 'Educate staff',
              costSaving: 400000,
              paybackMonths: 6,
            },
          ],
        },
      })
    );
  }

  readonly trackAction = (index: number, { id }: ActionItem) => id;
}
