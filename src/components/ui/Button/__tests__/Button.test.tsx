/* eslint-disable no-undef */
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import React from 'react';
import Button from 'UI/Button/index';

describe('Render Button', () => {
  it('Render correct', () => {
    const Component = () => (<Button buttonType="round" onClick={(e) => { e.preventDefault(); }}>Test</Button>);
    const buttonComponent = renderer.create(<Component />).toJSON();
    expect(buttonComponent).toMatchSnapshot();
  });

  it('buttonType="rect"', () => {
    const Component = () => (<Button buttonType="rect">Test rect button</Button>);
    const wrapper = mount(<Component />);
    expect(wrapper.find('.button_type_rect')).toHaveLength(1);
    expect(wrapper.find('.button_type_rounded')).toHaveLength(0);
  });
  it('buttonType="round"', () => {
    const Component = () => (<Button buttonType="round">Test rect button</Button>);
    const wrapper = mount(<Component />);
    expect(wrapper.find('.button_type_rect')).toHaveLength(0);
    expect(wrapper.find('.button_type_rounded')).toHaveLength(1);
  });
});
