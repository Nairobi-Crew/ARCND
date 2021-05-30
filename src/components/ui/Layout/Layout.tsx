import React, {useEffect, useState} from "react";
import {useAuthReselect, useThemeReselect} from "Store/hooks";
import Button from "UI/Button";
import Form from "UI/Form";
import Input from "UI/Input";
import routes from "Config/routes";
import './Layout.scss'
import {Link} from "react-router-dom";
import {EAuthState} from "Reducers/auth/types";
import {LayoutProps} from "UI/Layout/types";

const Layout: LayoutProps = ({children}) => {
  const auth = useAuthReselect();
  const [authState, setAuthState] = useState(auth.state === EAuthState.LOGGED);
  const theme = useThemeReselect()
  const [formVisible,setFormVisible] = useState(false)
  const [name,setName] = useState('')
  const [message,setMessage] = useState('')
  useEffect(() => {
    const { state } = auth;
    setAuthState(state === EAuthState.LOGGED);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return (
    <div className={`layout root${theme&&` root_theme_${theme.theme.color}`}`}>
      <div className="layout__main-content">
        <nav className="layout__nav">
          {
            routes.filter(
              (item) => {
                if (item.visibility === 'never' || item.key === 'not_found') {
                  return false;
                }
                if (item.visibility === 'always') {
                  return true;
                }
                if (authState) {
                  return item.visibility !== 'unauth';
                }
                return item.visibility !== 'auth';
              },
            ).map(
              (link) => (
                <Link className="layout__link" key={link.path} to={link.path}>{link.title}</Link>
              ),
            )
          }
        </nav>
        <main>
          {children}
        </main>
      </div>
      <footer className="layout__footer">
        <a className="layout__footer-link" href="https://github.com/Nairobi-Crew/ARCND">
          Made by Nairobi-Crew
        </a>

        <span className="layout__btn" onClick={()=>{
          setFormVisible(true)
        }}>Напиште нам
        </span>
      </footer>
      {<div className={`layout__popup${formVisible ? ' layout__popup_active' : ''}`}>
        <Button className="layout__form-close" onClick={()=>setFormVisible(false)}>
          х
        </Button>
        <Form className="layout__form"
              caption='Обратная связь'
              header={false}
              maxHeight={false}
              onSubmit={()=>setFormVisible(false)}>
          <Input label="Ваше имя" value={name} onValueChanged={(v) => setName(v)} />
          <Input label="Сообщение" value={message} onValueChanged={(v) => setMessage(v)} />
        </Form>
      </div>}
    </div>
  )
}

export default Layout
