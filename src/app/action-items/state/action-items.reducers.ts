import { createReducer, on } from '@ngrx/store';
import { ActionItems, ActionItemsGrouping } from '../action-items.models';
import { setActionStage, setActions } from './action-items.actions';

export interface ActionItemState {
  actionsItems: ActionItemsGrouping;
}

const initialState: ActionItemState = {
  actionsItems: {
    pending: [],
    inProgress: [],
    complete: [],
  },
};

export const actionItemReducer = createReducer(
  initialState,
  on(setActions, (state, action) => {
    return { ...state, actionsItems: action.actions };
  }),
  on(setActionStage, (state, { stage, action }) => {
    let pendingActions: ActionItems = [];
    if (stage !== 'pending') {
      pendingActions = state.actionsItems.pending.filter(
        ({ id }) => id !== action.id
      );
    } else {
      pendingActions = [...state.actionsItems.pending, action];
    }

    let inProgressActions: ActionItems = [];
    if (stage !== 'inProgress') {
      inProgressActions = state.actionsItems.inProgress.filter(
        ({ id }) => id !== action.id
      );
    } else {
      inProgressActions = [...state.actionsItems.inProgress, action];
    }

    let completeActions: ActionItems = [];
    if (stage !== 'complete') {
      completeActions = state.actionsItems.complete.filter(
        ({ id }) => id !== action.id
      );
    } else {
      completeActions = [...state.actionsItems.complete, action];
    }

    return {
      ...state,
      actionsItems: {
        pending: pendingActions,
        inProgress: inProgressActions,
        complete: completeActions,
      },
    };
  })
);
