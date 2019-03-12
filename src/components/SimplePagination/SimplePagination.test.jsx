import { mount } from 'enzyme';
import React from 'react';

import SimplePagination from './SimplePagination';

describe('SimplePagination', () => {
  test('only one page', () => {
    const mockPage = jest.fn();
    const wrapper = mount(<SimplePagination page={1} maxPage={1} onPage={mockPage} />);
    const clickableButtons = wrapper.find('div[onClick]');
    // Because the page number is the same as maxPage we shouldn't have any clickable or tabbable buttons
    expect(clickableButtons).toHaveLength(0);
    const tabbableButtons = wrapper.find('div[tabIndex=0]');
    // Because the page number is the same as maxPage we shouldn't have any clickable or tabbable buttons
    expect(tabbableButtons).toHaveLength(0);
  });
  test('both buttons should be clickable', () => {
    const mockPage = jest.fn();
    const wrapper = mount(<SimplePagination page={2} maxPage={4} onPage={mockPage} />);
    const clickableButtons = wrapper.find('div[onClick]');
    // Because the page number is the same as maxPage we shouldn't have any clickable or tabbable buttons
    expect(clickableButtons).toHaveLength(2);
    const tabbableButtons = wrapper.find('div[tabIndex=0]');
    // Because the page number is the same as maxPage we shouldn't have any clickable or tabbable buttons
    expect(tabbableButtons).toHaveLength(2);
  });
});
