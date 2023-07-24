# Unfinished items (To Do's)
1. Fix the code around the payback period formatting in the action item card. The test is correct, but failing. 
    - /src/app/action-items/components/action-item-card/action-item-card.component.ts:57
    - /src/app/action-items/components/action-item-card/action-item-card.component.spec.ts:104

2. Implement action items summary component + tests (all the data is in the store already).
   - /src/app/action-items/components/action-items-summary/action-items-summary.component.ts

3. Improve return type of ActionItemPage.getElementByTestId() in respect of the failing case.
    - src/app/action-items/components/action-item-card/action-item-card.component.spec.ts

# Code Review
3. Please could you provide feedback on how was the cost saving tests implemented?
    - /src/app/action-items/components/action-item-card/action-item-card.component.spec.ts:55

4. Review the code in the action-items-stages component (both TypeScript and HTML) to see whether this could be simplified as it seems there is some repetition.
    - /src/app/action-items/components/action-items-stages/action-items-stages.component.ts
 
5. Re-work the loading of the actions to use an API client (discuss an approach from a high-level - no actual implementation required).
    - /src/app/action-items/components/action-items-stages/action-items-stages.component.ts
