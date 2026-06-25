import { Component, type ErrorInfo, type ReactNode } from 'react';

import styles from '../ErrorMessage/ErrorMessage.module.scss';

export class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError = () => ({ hasError: true });

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorWrapper}>
          <div className={styles.title}>Something went wrong</div>
          <p className={styles.text}>The application encountered an unexpected error</p>
          <button className={styles.retryBtn} onClick={() => window.location.reload()}>
            Refresh the page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
