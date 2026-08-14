'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './sidebar.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { clearUser } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.auth.username);
  const access = useAppSelector((state) => state.auth.access);
  const router = useRouter();

  const logout = () => {
    dispatch(clearUser());
    router.push('/music/main');
  };

  const login = () => {
    router.push('/auth/signin');
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>{username || 'Гость'}</p>
        <div className={styles.sidebar__icon} onClick={access ? logout : login}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/2">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/3">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/4">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
