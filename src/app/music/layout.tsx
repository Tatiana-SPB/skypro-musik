import { ReactNode } from 'react';
import styles from './layout.module.css';
import Bar from '@/components/Bar/Bar';
import Navigation from '@/components/Navigation/Navigation';
import Sidebar from '@/components/Sidebar/Sidebar';

interface MainLayoutProp {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProp) {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <main className={styles.main}>
            <Navigation></Navigation>
            {children}
            <Sidebar></Sidebar>
          </main>
          <Bar></Bar>
          <footer className="footer"></footer>
        </div>
      </div>
    </>
  );
}
