import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import React from 'react';
import Form from 'UI/Form/Form';
import Input from 'UI/Input/Input';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Render Form', () => {
  const Component = () => (
    <Router>
      <Form>
        <Input value="Test value" label="Test" />
      </Form>
    </Router>
  );

  it('Render form correct', () => {
    const inputComponent = renderer.create(<Component />).toJSON();
    expect(inputComponent).toMatchSnapshot();
  });

  it('test className', () => {
    const wrapper = mount(<Component />);
    expect(wrapper.find('.form__container')).toHaveLength(1);
    expect(wrapper.find('.form__form_column')).toHaveLength(2);
  });
});
