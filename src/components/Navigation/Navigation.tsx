'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './navigation.module.css';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  clearUser,
  setAccessToken,
  setRefreshToken,
} from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const dispatch = useAppDispatch();
  const access = useAppSelector((state) => state.auth.access);
  const refresh = useAppSelector((state) => state.auth.refresh);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const logout = () => {
    dispatch(clearUser());
    router.push('/music/main');
  };

  const login = () => {
    router.push('/auth/signin');
    dispatch(setAccessToken(access), setRefreshToken(refresh));
  };

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Link href={'/music/main'}>
          <Image
            width={250}
            height={170}
            className={styles.logo__image}
            src="/img/logo.png"
            alt={'logo'}
          />
        </Link>
      </div>
      <div onClick={toggleMenu} className={styles.nav__burger}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      <div
        className={`${styles.nav__menu} ${isMenuOpen ? styles.menu__close : ''}`}
      >
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <Link href={'/music/main'} className={styles.menu__link}>
              Главное
            </Link>
          </li>
          {access ? (
            <li className={styles.menu__item}>
              <Link href={'/music/favorite'} className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
          ) : (
            ''
          )}
          <li className={styles.menu__item}>
            <p className={styles.menu__link} onClick={access ? logout : login}>
              {access ? 'Выйти' : 'Войти'}
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
}
