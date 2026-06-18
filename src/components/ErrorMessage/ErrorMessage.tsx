import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({
  message = 'Failed to load calendar data',
  onRetry,
}: ErrorMessageProps) => {
  return (
    <div className={styles.errorWrapper}>
      <div className={styles.title}>Something went wrong</div>
      <p className={styles.text}>{message}</p>
      {onRetry && (
        <button className={styles.retryBtn} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};
