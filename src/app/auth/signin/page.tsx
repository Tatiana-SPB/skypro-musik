'use client';
import classNames from 'classnames';
import styles from './signin.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { authUser } from '@/servises/auth/authApi';
import { AxiosError } from 'axios';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      return setErrorMessage('Заполните все поля');
    }

    setIsLoading(true);

    authUser({ email, password })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            //запрос был сделан, и сервер ответил состоянием не 200, здесь обработать 400-е ошибки
            setErrorMessage(error.response.data.message);
          } else {
            if (error.request) {
              console.log(error.request);
              setErrorMessage('Что-то с интернетом');
              //запрос был сделан, но ответа не получено, здесь обработать ситуацию нет интернета
            } else {
              console.log(error.message);
              //что-то произошло вызвавшее ошибку
              setErrorMessage('Неизвестная ошибка');
            }
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <a href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </a>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        className={styles.modal__btnEnter}
        onClick={onSubmit}
        disabled={isLoading}
      >
        Войти
      </button>
      <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
