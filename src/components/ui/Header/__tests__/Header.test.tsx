/* eslint-disable no-undef */
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import React from 'react';
import Header from 'UI/Header/Header';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Render Header', () => {
  const Component = () => (<Router><Header /></Router>);
  it('Render correct', () => {
    const inputComponent = renderer.create(<Component />).toJSON();
    expect(inputComponent).toMatchSnapshot();
  });

  it('test className', () => {
    const wrapper = mount(<Component />);
    expect(wrapper.find('.header')).toHaveLength(1);
    expect(wrapper.find('.header').find('.header__title')).toHaveLength(3);
  });
});
