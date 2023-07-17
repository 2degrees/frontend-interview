import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.config';
import { ActionItemsGrouping } from '../action-items.models';
import { ActionItemState } from './action-items.reducers';

const selectActionItemState = (state: AppState) => state.actionItems;

export const selectActionItems = (stage: keyof ActionItemsGrouping) =>
  createSelector(selectActionItemState, (state: ActionItemState) => {
    return state.actionsItems[stage];
  });
