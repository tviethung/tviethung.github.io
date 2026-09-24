export const featuredProductIds = Object.freeze([12, 5, 4, 3, 1]);

export const timelineFilters = Object.freeze([
  'FEATURED',
  'LIVE',
  'ARCHIVED',
  'ALL',
]);

export const getFeaturedProducts = (products) =>
  products.filter((product) => product.isFavorite);

export const getTimelineProducts = (products, filter) => {
  if (filter === 'FEATURED') return getFeaturedProducts(products);
  if (filter === 'LIVE') return products.filter(({ status }) => status === 'Live');
  if (filter === 'ARCHIVED') return products.filter(({ status }) => status === 'Removed');

  return [...products];
};
