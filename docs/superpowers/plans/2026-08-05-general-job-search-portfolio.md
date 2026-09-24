# General Job-Search Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio lead with balanced puzzle-mobile evidence and clear technical leadership proof for general game-studio applications.

**Architecture:** Keep `portfolio.json` as content source of truth and add a small pure presentation selector that defines featured order and the hiring-friendly timeline filters. `Hero`, `Projects`, and `ProductTimeline` consume that selector without changing the established React, Framer Motion, or Tailwind visual system.

**Tech Stack:** React 19, Vite 8, Tailwind CSS 4, Framer Motion, Node built-in test runner, oxlint.

## Global Constraints

- Use only verifiable projects, roles, release dates, store links, and download figures already held in `src/data/portfolio.json`.
- Do not invent retention, CPI, revenue, performance, or team-size metrics.
- Preserve existing retro HUD styling, animation, modal behavior, and deployment configuration.
- Show live puzzle work and leadership evidence before the full release archive.
- Use `ARCHIVED` as the user-facing replacement for `REMOVED` while retaining existing source data.

---

### Task 1: Product-presentation selector

**Files:**
- Create: `src/data/portfolioPresentation.js`
- Create: `tests/portfolioPresentation.test.mjs`
- Modify: `src/data/portfolio.json`

**Interfaces:**
- Consumes: `products: Array<{ id: number, status: string, isFavorite: boolean }>` from `portfolio.json`.
- Produces: `featuredProductIds: readonly number[]`, `getFeaturedProducts(products)`, `getTimelineProducts(products, filter)`, and `timelineFilters`.
- `getTimelineProducts` accepts `filter: 'FEATURED' | 'LIVE' | 'ARCHIVED' | 'ALL'` and returns a new array without mutating `products`.

- [ ] **Step 1: Write the failing test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  featuredProductIds,
  getFeaturedProducts,
  getTimelineProducts,
  timelineFilters,
} from '../src/data/portfolioPresentation.js';

const products = [
  { id: 3, status: 'Removed', isFavorite: true },
  { id: 4, status: 'Removed', isFavorite: true },
  { id: 12, status: 'Live', isFavorite: true },
  { id: 16, status: 'Live', isFavorite: false },
  { id: 17, status: 'Live', isFavorite: false },
];

test('orders featured products for balanced job-search evidence', () => {
  assert.deepEqual(featuredProductIds, [12, 16, 4, 3]);
  assert.deepEqual(getFeaturedProducts(products).map(({ id }) => id), [12, 16, 4, 3]);
});

test('separates live products from archived products without mutating source data', () => {
  assert.deepEqual(getTimelineProducts(products, 'LIVE').map(({ id }) => id), [12, 16, 17]);
  assert.deepEqual(getTimelineProducts(products, 'ARCHIVED').map(({ id }) => id), [3, 4]);
  assert.equal(products[0].status, 'Removed');
});

test('exposes hiring-friendly timeline filters', () => {
  assert.deepEqual(timelineFilters, ['FEATURED', 'LIVE', 'ARCHIVED', 'ALL']);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/portfolioPresentation.test.mjs`

Expected: FAIL because `src/data/portfolioPresentation.js` does not exist.

- [ ] **Step 3: Write minimal implementation**

```js
export const featuredProductIds = Object.freeze([12, 16, 4, 3]);
export const timelineFilters = Object.freeze(['FEATURED', 'LIVE', 'ARCHIVED', 'ALL']);

export const getFeaturedProducts = (products) =>
  featuredProductIds
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

export const getTimelineProducts = (products, filter) => {
  if (filter === 'LIVE') return products.filter(({ status }) => status === 'Live');
  if (filter === 'ARCHIVED') return products.filter(({ status }) => status === 'Removed');
  if (filter === 'FEATURED') return getFeaturedProducts(products);
  return [...products];
};
```

Add verified `isFavorite` flags and copy updates in `portfolio.json` so its data agrees with the selector and experience count.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/portfolioPresentation.test.mjs`

Expected: PASS for both tests.

- [ ] **Step 5: Commit**

```bash
git add src/data/portfolioPresentation.js src/data/portfolio.json tests/portfolioPresentation.test.mjs
git commit -m "feat: prioritize balanced portfolio evidence"
```

### Task 2: Hiring-oriented portfolio presentation

**Files:**
- Modify: `src/components/Hero.jsx`
- Modify: `src/components/Projects.jsx`
- Modify: `src/components/ProductTimeline.jsx`
- Test: `tests/portfolioPresentation.test.mjs`

**Interfaces:**
- Consumes: `getFeaturedProducts(products)`, `getTimelineProducts(products, filter)`, and `timelineFilters` from `src/data/portfolioPresentation.js`.
- Produces: a hero with the revised positioning, four ordered featured cards, and `FEATURED`, `LIVE`, `ARCHIVED`, and `ALL` timeline controls.

- [ ] **Step 1: Confirm the selector contract is green before wiring UI**

Run: `node --test tests/portfolioPresentation.test.mjs`

Expected: PASS for the tested featured ordering, archive mapping, immutability, and timeline filter labels.

- [ ] **Step 2: Wire the tested presentation selector into the UI**

```jsx
const [statusFilter, setStatusFilter] = useState('FEATURED');
const filteredProducts = getTimelineProducts(products, statusFilter)
  .filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
```

Update `Projects.jsx` to use `getFeaturedProducts(products)`. Render tabs from `timelineFilters`; surface `ARCHIVED` in card and modal status copy when a product's source status is `Removed`. Revise hero and summary copy to use the approved general-job-search title and proof-oriented description.

- [ ] **Step 3: Run tests, lint, and production build**

Run:

```bash
node --test tests/portfolioPresentation.test.mjs
npm run lint
npm run build
```

Expected: all commands exit 0.

- [ ] **Step 4: Check the rendered portfolio**

Run: `npm run dev -- --host 127.0.0.1` and inspect desktop and mobile layouts.

Expected: the hero reflects the updated positioning; featured cards appear as Merge Drop Master, JigMaster, My Pool Club, and Brave Miner; the initial timeline presents those four items; Live and Archived filters return the correct sets.

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.jsx src/components/Projects.jsx src/components/ProductTimeline.jsx tests/portfolioPresentation.test.mjs
git commit -m "feat: tailor portfolio for game studio applications"
```
