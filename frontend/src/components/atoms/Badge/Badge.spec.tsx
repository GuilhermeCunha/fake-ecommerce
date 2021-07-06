import React from 'react';
import { mount, shallow } from 'enzyme';

import Badge from '.';

describe('<Badge />', () => {
  const component = shallow(
    <Badge text="Test">
      <div>X</div>
    </Badge>,
  );
  test('must have a container', async () => {
    expect(component.find("[data-testid='badge-container']")).toHaveLength(1);
  });

  test('must be positioned above the child', async () => {
    expect(
      component
        .find("[data-testid='badge']")
        .hasClass('absolute top-0 right-0'),
    ).toBe(true);
  });
  test('must have the text filled', async () => {
    expect(component.find("[data-testid='badge']").text()).toBe('Test');
  });
});
