import { createAction, props } from '@ngrx/store';
import { ActionItemsGrouping, ActionItem } from '../action-items.models';

const PREFIX = '[App]';

export const setActions = createAction(
  `${PREFIX} set actions`,
  props<{ actions: ActionItemsGrouping }>()
);

export const setActionStage = createAction(
  `${PREFIX} set action state`,
  props<{ action: ActionItem; stage: keyof ActionItemsGrouping }>()
);
