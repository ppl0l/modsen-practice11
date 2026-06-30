import { Component, type ErrorInfo, type ReactNode } from 'react';

import styles from '../ErrorMessage/ErrorMessage.module.scss';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    this.handleReload = this.handleReload.bind(this);
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, info);
  }

  handleReload(): void {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorWrapper}>
          <div className={styles.title}>Something went wrong</div>
          <p className={styles.text}>The application encountered an unexpected error</p>
          <button className={styles.retryBtn} onClick={this.handleReload}>
            Refresh the page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
