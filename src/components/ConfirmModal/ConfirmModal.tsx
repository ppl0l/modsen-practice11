import { FiAlertTriangle } from 'react-icons/fi';

import { CONFIRM_MODAL_TEXTS, type ConfirmModalType } from '@/constants/confirmModal';

import styles from './ConfirmModal.module.scss';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type?: ConfirmModalType;
  title?: string;
  message?: string;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  type = 'delete',
  title,
  message,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  const texts = CONFIRM_MODAL_TEXTS[type];
  const finalTitle = title ?? texts.title;
  const finalMessage = message ?? texts.message;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <FiAlertTriangle size={48} className={styles.icon} />
        <h2 className={styles.title}>{finalTitle}</h2>
        <p className={styles.message}>{finalMessage}</p>
        <div className={styles.actions}>
          <button className={`${styles.btn} ${styles.btnCancel}`} onClick={onClose}>
            {texts.cancelButton}
          </button>
          <button className={`${styles.btn} ${styles.btnDelete}`} onClick={handleConfirm}>
            {texts.confirmButton}
          </button>
        </div>
      </div>
    </div>
  );
};
