import React, { Component, ReactNode } from 'react';
import { State } from 'Components/ErrorBoundary/types';
import { globalBus } from 'Util/EventBus';

globalBus.on('COMPONENT_ERROR', (error, errorInfo) => {
  console.error({ error, errorInfo });
});

class ErrorBoundary extends Component<{ children: ReactNode }> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo) {
    this.setState({ hasError: error });
    globalBus.emit('COMPONENT_ERROR', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>Что-то пошло не так.</h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
