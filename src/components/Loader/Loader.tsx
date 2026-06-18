import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinner} />
      <span className={styles.text}>Loading calendar data...</span>
    </div>
  );
};
