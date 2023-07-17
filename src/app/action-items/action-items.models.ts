export interface ActionItem {
  id: string;
  title: string;
  costSaving: number;
  paybackMonths: number;
}

export type ActionItems = readonly ActionItem[];

export interface ActionItemsGrouping {
  pending: ActionItems;
  inProgress: ActionItems;
  complete: ActionItems;
}
