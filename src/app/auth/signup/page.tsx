'use client';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './signup.module.css';
import { useState } from 'react';
import { regUser } from '@/servises/auth/authApi';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (
      !email.trim() ||
      !password.trim() ||
      !username.trim() ||
      !confirmPassword.trim()
    ) {
      return setErrorMessage('Заполните все поля');
    }

    if (password !== confirmPassword) {
      return setErrorMessage('Пароли не совпадают');
    }
    setIsLoading(true);

    regUser({ email, username, password })
      .then((res) => {
        setSuccessMessage(
          'Регистрация прошла успешно! Направляем на страницу входа...',
        );

        setTimeout(() => {
          router.push('/auth/signin');
        }, 2000);
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
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </Link>
      {successMessage && (
        <div
          className={classNames(styles.errorContainer, styles.successMessage)}
        >
          {successMessage}
        </div>
      )}
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="username"
        placeholder="Имя"
        onChange={onChangeUsername}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="confirmPassword"
        placeholder="Повторите пароль"
        onChange={onChangeConfirmPassword}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        className={styles.modal__btnSignupEnt}
        onClick={onSubmit}
        disabled={isLoading}
      >
        Зарегистрироваться
      </button>
    </>
  );
}
