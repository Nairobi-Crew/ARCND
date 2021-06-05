import React from 'react';
import './Main.scss';
import ErrorBoundary from "Components/ErrorBoundary/ErrorBoundary";

const Main: React.FC = () => (
  <ErrorBoundary>
    <div className="team">
      <h1>
        <b>
          Команда НАИРОБИ
        </b>
      </h1>
    </div>
    <div className="game">
      <h2>
        Игра
        &nbsp;
        <i>Арканоид</i>
      </h2>
    </div>
  </ErrorBoundary>
);
export default Main;
