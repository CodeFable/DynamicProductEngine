# card.lab
A simple product card UI built with HTML and CSS only. No libraries, no frameworks — just a clean shell waiting for you to add the JavaScript.


## The idea
You get a page with a grid of product cards, a button to add new ones, and a few filters. The whole point is that the UI is already done. Your job is to make it work.


## What's on the page
The **header** has a logo and an "Add Product" button. Clicking it should open the modal — that's your first task.

The **filter bar** has three controls: a search input, a category dropdown, and a sort dropdown. There's also a small count chip that should update whenever cards are added or filtered.

The **grid** is where all the cards live. Four sample cards are already in there so the page doesn't look empty when you start.

The **modal** is a form with fields for name, description, price, rating, category, and an emoji. At the bottom there's a Cancel button and a Generate Card button. Filling the form and clicking Generate is how new cards get created.


## The hooks
Every interactive element has an `id` on it. You don't need to guess — just open the file, search for `id=`, and you'll find everything. The modal opens and closes by toggling a class called `.open` on the overlay. That's the only CSS trick worth knowing upfront.


## What to build, in order
Start with opening and closing the modal. Once that works, move on to generating a card from the form inputs and dropping it into the grid. After that, tackle search, then the category filter, then sort. Finally, combine search and category so they work together at the same time. The empty state — a small message shown when nothing matches — is a nice finishing touch.

That's seven small problems. Solve them one at a time and you'll have a fully working product page.

## Good to know
Each card has a `data-category` attribute on it. That's what you'll read when filtering. The image area background is just a CSS class — there are five colour variants, so rotate through them when generating new cards to keep things looking varied.
The CSS uses variables at the top of the file. If you want to change the colours or fonts, that's the only place you need to touch.
