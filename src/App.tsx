import React, { PureComponent } from 'react';
import Button from "./blocks/Button/Button";
import Input from "./blocks/Input/Input";


class App extends PureComponent {
  render() {
    return (
      <div>
        <h1>Мой апп.</h1>
        <Button>button</Button>
        <Input label='label'/>
      </div>
    );
  }
}
export default App;
