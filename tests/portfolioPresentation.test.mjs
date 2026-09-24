import assert from 'node:assert/strict';
import test from 'node:test';
import {
  featuredProductIds,
  getFeaturedProducts,
  getTimelineProducts,
  timelineFilters,
} from '../src/data/portfolioPresentation.js';

const products = [
  { id: 12, status: 'Live', isFavorite: true },
  { id: 5, status: 'Live', isFavorite: true },
  { id: 4, status: 'Removed', isFavorite: true },
  { id: 3, status: 'Removed', isFavorite: true },
  { id: 1, status: 'Live', isFavorite: true },
  { id: 16, status: 'Live', isFavorite: false },
  { id: 17, status: 'Live', isFavorite: false },
];

test('orders featured products for balanced job-search evidence', () => {
  assert.deepEqual(featuredProductIds, [12, 5, 4, 3, 1]);
  assert.deepEqual(getFeaturedProducts(products).map(({ id }) => id), [12, 5, 4, 3, 1]);
});

test('separates live products from archived products without mutating source data', () => {
  assert.deepEqual(getTimelineProducts(products, 'LIVE').map(({ id }) => id), [12, 5, 1, 16, 17]);
  assert.deepEqual(getTimelineProducts(products, 'ARCHIVED').map(({ id }) => id), [4, 3]);
  assert.equal(products[0].status, 'Live');
});

test('exposes hiring-friendly timeline filters', () => {
  assert.deepEqual(timelineFilters, ['FEATURED', 'LIVE', 'ARCHIVED', 'ALL']);
});
