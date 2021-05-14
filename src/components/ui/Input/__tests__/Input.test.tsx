/* eslint-disable no-undef */
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import React from 'react';
import Input from 'UI/Input/Input';

describe('Render Input', () => {
  it('Render correct', () => {
    const Component = () => (
      <Input
        errorMessage="Test error message"
        disabled={false}
        value="TestValue"
        onChange={(e) => e.target.value}
        onValueChanged={(v) => v}
      />
    );
    const inputComponent = renderer.create(<Component />).toJSON();
    expect(inputComponent).toMatchSnapshot();
  });

  it('value="test val1"', () => {
    const wrapper = mount(<Input value="test val1" />);
    expect(wrapper.prop('value')).toEqual('test val1');
    expect(wrapper.prop('value')).not.toEqual('test val1 ');
    expect(wrapper.prop('value')).not.toEqual('Test val1');
  });

  it('errorMessage=""', () => {
    const wrapper = mount(<Input errorMessage="" value="Nothing" />);
    expect(wrapper.find('.input__error-message').at(0).text()).toEqual('');
    expect(wrapper.prop('errorMessage')).toEqual('');
  });

  const message = 'TeSt Me$$a9e';
  it(`errorMessage="${message}"`, () => {
    const wrapper = mount(<Input errorMessage={message} value="Nothing" />);
    expect(wrapper.find('.input__error-message').at(0).text()).toEqual(message);
    expect(wrapper.prop('errorMessage')).toEqual(message);
  });
});
