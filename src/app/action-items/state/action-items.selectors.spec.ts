import { ActionItemState } from './action-items.reducers';
import { selectActionItems } from './action-items.selectors';

const stateFixture: ActionItemState = {
  actionsItems: {
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
};

describe('Action items selectors', () => {
  describe(selectActionItems.name, () => {
    it('should select "pending" action items', () => {
      expect(selectActionItems('pending').projector(stateFixture)).toEqual(
        stateFixture.actionsItems.pending
      );
    });

    it('should select "inProgress" action items', () => {
      expect(selectActionItems('inProgress').projector(stateFixture)).toEqual(
        stateFixture.actionsItems.inProgress
      );
    });

    it('should select "complete" action items', () => {
      expect(selectActionItems('complete').projector(stateFixture)).toEqual(
        stateFixture.actionsItems.complete
      );
    });
  });
});
