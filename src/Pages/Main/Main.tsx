import React from 'react';
import { MainProps } from 'Pages/Main/types';
import { Link } from 'react-router-dom';
import './Main.scss';

const Main: React.FC<MainProps> = ({ items, auth }: MainProps) => (
  <li className="linkBlock">
    {
    items.filter((item) => !item.auth || auth === item.auth).map(
      (link) => (
        <ul>
          <div className="link">
            <Link key={link.href} to={link.href}>{link.name}</Link>
          </div>
        </ul>
      ),
    )
  }
  </li>
);

export default Main;
