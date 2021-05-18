import React, { Component, ErrorInfo, ReactNode } from 'react';
import { State } from 'Components/ErrorBoundary/types';
import { globalBus } from 'Util/EventBus';

globalBus.on('COMPONENT_ERROR', (error, errorInfo) => {
  // eslint-disable-next-line no-console
  console.error({ error, errorInfo });
});

class ErrorBoundary extends Component<{ children: ReactNode }> {
  // eslint-disable-next-line react/state-in-constructor
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: error });
    globalBus.emit('COMPONENT_ERROR', error, errorInfo);
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.hasError) {
      return (
        <h1>Что-то пошло не так.</h1>
      );
    }

    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children;
  }
}

export default ErrorBoundary;
