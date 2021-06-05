import React, { useEffect, useState } from 'react';
import { useAuthReselect, useThemeReselect } from 'Store/hooks';
import Button from 'UI/Button';
import Form from 'UI/Form';
import Input from 'UI/Input';
import routes from 'Config/routes';
import './Layout.scss';
import { Link, useLocation } from 'react-router-dom';
import { EAuthState } from 'Reducers/auth/types';
import { LayoutProps } from 'UI/Layout/types';
import sendComment from 'Util/sendComment';
import Textarea from 'UI/Textarea';
import OAuth from 'Pages/OAuth/index';
import ErrorBoundary from "Components/ErrorBoundary/ErrorBoundary";

const Layout: LayoutProps = ({ children }) => {
  const auth = useAuthReselect();
  const [authState, setAuthState] = useState(auth.state === EAuthState.LOGGED);
  const path = useLocation();
  const theme = useThemeReselect();
  const [formVisible, setFormVisible] = useState(false);
  const [navOpened, setNavOpened] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const { state } = auth;
    setAuthState(state === EAuthState.LOGGED);
    setName(name ?? auth?.user?.first_name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  useEffect(() => {
    setNavOpened(false);
    setFormVisible(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  // TODO: поправить цвета ссылок в светлой теме
  return (
    <div className={`layout${path.pathname === '/game' ? ' layout_fullscreen' : ''} root${theme && ` root_theme_${theme.theme.color}`}`}>
      <OAuth />
      <div className="layout__main-content">
        <nav className={`layout__nav${navOpened ? ' layout__nav_opened' : ''}`}>
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
          {
            path.pathname === '/game'
            && <Button aria-label="Открыть меню" className="layout__open-nav-btn" onClick={() => setNavOpened(!navOpened)} />
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

        <span
          className="layout__btn"
          onClick={() => {
            setFormVisible(true);
          }}
        >
          Напиште нам
        </span>
      </footer>
      <div className={`layout__popup${formVisible ? ' layout__popup_active' : ''}`}>
        <Button
          className="layout__form-close"
          onClick={() => setFormVisible(false)}
        >
          x
        </Button>
        <ErrorBoundary>
        <Form
          className="layout__form"
          caption="Обратная связь"
          header={false}
          maxHeight={false}
          onSubmit={() => {
            sendComment(`Автор: ${name}, Текст: ${message}`).then(() => {
              setFormVisible(false);
            }).catch((e) => {
              setErrorMessage(e);
            });
          }}
        >
          <Input label="Ваше имя" value={name} required onValueChanged={(v) => setName(v)} />
          <Textarea label="Сообщение" value={message} required onValueChanged={(v) => setMessage(v)} errorMessage={errorMessage} />
          <Button>
            Отправить
          </Button>
        </Form>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Layout;
