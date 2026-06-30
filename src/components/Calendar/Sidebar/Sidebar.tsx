import { FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa';
import { FiCalendar, FiX } from 'react-icons/fi';

import styles from './Sidebar.module.scss';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
          <FiX size={24} />
        </button>

        <div className={styles.logo}>Modsen Calendar</div>

        <div className={styles.profileCard}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatarPlaceholder}>RR</div>
          </div>
          <div>
            <div className={styles.userName}>Hello Rosalie</div>
            <div className={styles.userEmail}>rosalie.rice@gmail.com</div>
          </div>
        </div>

        <button className={styles.menuItem}>
          <FiCalendar size={20} />
          <span>Calendars</span>
        </button>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            We have clothes that suits your style and which you're proud to wear. From women to men.
          </p>
          <div className={styles.socials}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              aria-label="Facebook"
            >
              <FaFacebook size={18} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
