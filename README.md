# M2030 Frontend Interview project

## The exercise

In this scenario, one of your team members has started work on implementing a page which shows the progress of a customer's selected actions and what stage they are at. The person who started work ran out of time before going on holiday and has handed over the task to you and another team mate.

You need to work together to decide how to finish this piece of work and follow-up on your colleagues TODO notes that they left.

### Requirements from product

If you need further information, [see here](https://github.com/2degrees/frontend-interview/blob/main/product-requirements.md).

### Handover from your colleague

> I've implemented most of the functionality and it should be working for the most part. However, I didn't get round to implementing the summary of the cost savings -- I created a component and pasted in the text from the design file, but didn't get round to wiring this up.

> I've made a list of TODOs that I would liked to have spent more time on that it would be useful for you to look over

#### Unfinished items

_You can search the codebase for the numbered `TODO n` item to find the code referred to_

1. [ ] Implement summary [component](https://github.com/2degrees/frontend-interview/blob/main/src/app/action-items/components/action-items-summary/action-items-summary.component.html#L3) + tests (all the data is in the store already) `TODO 1`
1. [ ] [Fix the code](https://github.com/2degrees/frontend-interview/blob/main/src/app/action-items/components/action-item-card/action-item-card.component.ts) around the payback period formatting. The test is correct, but failing `TODO 2`
1. [ ] Please could you provide feedback on [how I implemented the cost saving tests](https://github.com/2degrees/frontend-interview/blob/main/src/app/action-items/components/action-item-card/action-item-card.component.spec.ts). I'm not that happy with them yet `TODO 3`
1. [ ] Review the code in the [action-items-stages component](https://github.com/2degrees/frontend-interview/blob/main/src/app/action-items/components/action-items-stages/action-items-stages.component.ts) (both TypeScript and HTML) to see whether this could be simplified `TODO 4`

## How to work with the code

### Start the app

To start the development server run `nx serve frontend-interview`. Open your browser and navigate to http://localhost:4200/. Happy coding!

### Running tests

Test can be run via Jest. There's a handy shortcut in:

```bash
$ npm test
```

### Generate code

If you happen to use Nx plugins, you can leverage code generators that might come with it.

Run `nx list` to get a list of available plugins and whether they have generators. Then run `nx list <plugin-name>` to see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/plugin-features/use-code-generators).
