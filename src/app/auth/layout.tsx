import { ReactNode } from 'react';
import styles from './layout.module.css';

interface AuthLayoutProp {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProp) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.containerEnter}>
          <div className={styles.modal__block}>
            <form className={styles.modal__form}>{children}</form>
          </div>
        </div>
      </div>
    </>
  );
}
