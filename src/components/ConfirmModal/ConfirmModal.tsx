import { FiAlertTriangle } from 'react-icons/fi';

import styles from './ConfirmModal.module.scss';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete an event?',
  message = 'This action cannot be canceled. Are you sure you want to delete this event?',
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <FiAlertTriangle size={48} className={styles.icon} />
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button className={`${styles.btn} ${styles.btnCancel}`} onClick={onClose}>
            Cancel
          </button>
          <button
            className={`${styles.btn} ${styles.btnDelete}`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
