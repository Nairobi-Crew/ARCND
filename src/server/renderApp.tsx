import React, {FC, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import routes from 'Config/routes';
import {useThemeReselect} from "Store/hooks";
import Form from "UI/Form";
import Input from "UI/Input";
import Button from "UI/Button";

const renderApp = () => {
  return (
    <App />
  )
};

const App: FC = () => {
  const theme = useThemeReselect()
  const [formVisible,setFormVisible] = useState(false)
  const [name,setName] = useState('')
  const [message,setMessage] = useState('')
  return (
    <div className={`root${theme&&` root_theme_${theme.theme.color}`}`}>
      <Switch>
        {routes.map(
          (route) => <Route {...route} />,
        )}
      </Switch>
      <Button className="root__bnt" onClick={()=>{
        setFormVisible(true)
      }}>Напиште нам
      </Button>
      {formVisible&&<div className="root__form">
        <Button className="root__form-close" onClick={()=>setFormVisible(false)}>
          х
        </Button>
        <Form caption='Обратная связь' onSubmit={()=>setFormVisible(false)}>
          <Input label="Ваше имя" value={name} onValueChanged={(v) => setName(v)} />
          <Input label="Сообщение" value={message} onValueChanged={(v) => setMessage(v)} />
        </Form>
      </div>}
    </div>
  )
}

export default renderApp;

