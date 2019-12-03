import { mount } from 'enzyme';
import React from 'react';

import { itemsAndComponents } from './WizardInline.story';
import StatefulWizardInline from './StatefulWizardInline';

const commonWizardProps = {
  title: 'My Wizard',
  items: itemsAndComponents,
  currentItemId: itemsAndComponents[0].id,
  onClose: jest.fn(),
  onSubmit: jest.fn(),
};

describe('StatefulWizardInline', () => {
  test('onNext', () => {
    const mockNext = jest.fn();
    const wrapper = mount(<StatefulWizardInline {...commonWizardProps} onNext={mockNext} />);
    const cancelAndNextButtons = wrapper.find('.bx--btn');
    expect(cancelAndNextButtons).toHaveLength(3);
    cancelAndNextButtons.at(2).simulate('click');
    expect(mockNext).toHaveBeenCalled();
  });
  test('setItem', () => {
    const mockSetItem = jest.fn();
    const wrapper = mount(<StatefulWizardInline {...commonWizardProps} setItem={mockSetItem} />);
    const progressIndicatorButtons = wrapper.find('.bx--progress-step-button');
    expect(progressIndicatorButtons).toHaveLength(4);
    progressIndicatorButtons.at(1).simulate('click');
    expect(mockSetItem).toHaveBeenCalled();
  });
  test('error', () => {
    const wrapper = mount(<StatefulWizardInline {...commonWizardProps} error="I'm in error" />);
    const progressIndicatorButtons = wrapper.find('InlineNotification');
    expect(progressIndicatorButtons).toHaveLength(1);
  });
  test('error clear error', () => {
    const mockClearError = jest.fn();
    const wrapper = mount(
      <StatefulWizardInline
        {...commonWizardProps}
        error="I'm in error"
        onClearError={mockClearError}
      />
    );
    const clearErrorButton = wrapper.find('.bx--inline-notification__close-button');
    expect(clearErrorButton).toHaveLength(1);
    clearErrorButton.simulate('click');
    expect(mockClearError).toHaveBeenCalled();
  });
  test('setItem not triggered if invalid', () => {
    const mockSetItem = jest.fn();
    const wrapper = mount(
      <StatefulWizardInline
        {...commonWizardProps}
        currentItemId="item1"
        items={[
          { id: 'item1', name: 'Item1', component: <div>Item 1</div>, onValidate: () => false },
          { id: 'item2', name: 'Item2', component: <div>Item 2</div>, onValidate: () => false },
        ]}
        setItem={mockSetItem}
      />
    );
    const progressIndicatorButtons = wrapper.find('.bx--progress-step-button');
    expect(progressIndicatorButtons).toHaveLength(2);
    progressIndicatorButtons.at(1).simulate('click');
    expect(mockSetItem).not.toHaveBeenCalled();
  });
  test('onNext not triggered if invalid', () => {
    const mockNext = jest.fn();
    const wrapper = mount(
      <StatefulWizardInline
        {...commonWizardProps}
        currentItemId="item1"
        items={[
          { id: 'item1', name: 'Item1', component: <div>Item 1</div>, onValidate: () => false },
          { id: 'item2', name: 'Item2', component: <div>Item 2</div>, onValidate: () => false },
        ]}
        onNext={mockNext}
      />
    );
    const cancelAndNextButtons = wrapper.find('.bx--btn');
    expect(cancelAndNextButtons).toHaveLength(3);
    cancelAndNextButtons.at(1).simulate('click');
    expect(mockNext).not.toHaveBeenCalled();
  });
  test('onClose', () => {
    const mockClose = jest.fn();
    const wrapper = mount(<StatefulWizardInline {...commonWizardProps} onClose={mockClose} />);
    const cancelAndNextButtons = wrapper.find('.bx--btn');
    expect(cancelAndNextButtons).toHaveLength(3);
    cancelAndNextButtons.at(1).simulate('click');
    expect(mockClose).toHaveBeenCalled();
  });
  test('onBack', () => {
    const mockBack = jest.fn();
    const wrapper = mount(
      <StatefulWizardInline
        {...commonWizardProps}
        currentItemId={itemsAndComponents[1].id}
        onBack={mockBack}
      />
    );
    const backAndNextButtons = wrapper.find('.bx--btn');
    expect(backAndNextButtons).toHaveLength(3);
    backAndNextButtons.at(1).simulate('click');
    expect(mockBack).toHaveBeenCalled();
  });
  test('renders with inference of current item when currentItemId is not set', () => {
    const wrapper = mount(<StatefulWizardInline {...commonWizardProps} currentItemId={null} />);
    expect(wrapper.find('StatefulWizardInline')).toHaveLength(1);
  });
  test('renders with no next item when currentItem is the last item', () => {
    const wrapper = mount(
      <StatefulWizardInline
        {...commonWizardProps}
        currentItemId={itemsAndComponents[itemsAndComponents.length - 1].id}
      />
    );
    expect(wrapper.find('StatefulWizardInline')).toHaveLength(1);
  });
  test('handleNext advances to next with no onNext callback', () => {
    const wrapper = mount(<StatefulWizardInline {...commonWizardProps} />);
    const nextButton = wrapper.find('.bx--btn').at(2);
    nextButton.simulate('click');
    expect(wrapper.find('WizardInline').props().currentItemId).toBe(itemsAndComponents[1].id);
  });
  test('handleBack goes to previous with no onBack callback', () => {
    const wrapper = mount(
      <StatefulWizardInline {...commonWizardProps} currentItemId={itemsAndComponents[2].id} />
    );
    const backButton = wrapper.find('.bx--btn').at(1);
    backButton.simulate('click');
    expect(wrapper.find('WizardInline').props().currentItemId).toBe(itemsAndComponents[1].id);
  });
  test('setItem advances to the set item with no setItem callback', () => {
    const wrapper = mount(<StatefulWizardInline {...commonWizardProps} />);
    const progressIndicatorButtons = wrapper.find('.bx--progress-step-button');
    progressIndicatorButtons.at(3).simulate('click');
    expect(wrapper.find('WizardInline').props().currentItemId).toBe(itemsAndComponents[3].id);
  });
});
