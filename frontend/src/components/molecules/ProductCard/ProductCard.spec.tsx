import React from 'react';
import { mount, shallow } from 'enzyme';

import ProductCard from '.';

describe('<ProductCard />', () => {
  const productName = 'ProductName';
  const productImage = 'www.google.com.br/img.png';

  const favoriteComponent = shallow(
    <ProductCard
      imageUrl={productImage}
      name={productName}
      price={122}
      isFavorite={true}
      shortDescription="Description"
      onFavoriteClick={() => {
        //
      }}
    />,
  );

  const notFavoriteComponent = shallow(
    <ProductCard
      imageUrl={productImage}
      name={productName}
      price={122}
      isFavorite={false}
      shortDescription="Description"
      onFavoriteClick={() => {
        //
      }}
    />,
  );

  const component2 = shallow(
    <ProductCard
      imageUrl="www.google.com.br/img.png"
      name="ProductName"
      price={122}
      isFavorite={false}
      shortDescription="Description"
    />,
  );
  test('should show favorites container', async () => {
    expect(
      favoriteComponent.find("[data-testid='favorite-container']").length,
    ).toBe(1);
  });

  test('should not show favorites container', async () => {
    expect(component2.find("[data-testid='favorite-container']").length).toBe(
      0,
    );
  });

  test('must show product name', async () => {
    expect(favoriteComponent.find("[data-testid='product-name']").text()).toBe(
      productName,
    );
  });

  test('must show favorite icon', async () => {
    expect(favoriteComponent.find('[data-testid="favorite-icon"]').length).toBe(
      1,
    );
    expect(
      favoriteComponent.find('[data-testid="not-favorite-icon"]').length,
    ).toBe(0);
  });

  test('must not show favorite icon', async () => {
    expect(
      notFavoriteComponent.find('[data-testid="not-favorite-icon"]').length,
    ).toBe(1);
    expect(
      notFavoriteComponent.find('[data-testid="favorite-icon"]').length,
    ).toBe(0);
  });
  test('must show image', async () => {
    expect(
      notFavoriteComponent.find('[data-testid="product-image"]').prop('src'),
    ).toBe(productImage);
  });

  test('must show price', async () => {
    expect(
      notFavoriteComponent.find('[data-testid="product-price"]').length,
    ).toBe(1);
  });
});
