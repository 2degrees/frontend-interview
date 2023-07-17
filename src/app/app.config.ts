import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import {
  ActionItemState,
  actionItemReducer,
} from './action-items/state/action-items.reducers';

export interface AppState {
  actionItems: ActionItemState;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore<AppState>({
      actionItems: actionItemReducer,
    }),
  ],
};
