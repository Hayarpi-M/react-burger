import React, { useState } from 'react';
import styles from './FormPage.module.css';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../utils/constants';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, token: code })
      });

      const data = await response.json();

      if(data.success) {
        console.log("Password successfully reset")
      } else {
        setError(data.message || 'Ошибка сброса пароля');
      }
    }
    catch (err) {
      setError('Ошибка сети. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Восстановление пароля</h2>

        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Введите новый пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <span
            className={styles.togglePassword}
            role="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            👁️
          </span>
        </div>

        <input
          type="text"
          placeholder="Введите код из письма"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={styles.input}
          required
        />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.button} disabled={loading}>
          {loading? 'Сохранение...' : 'Сохранить'}
        </button>

        <p className={styles.footer}>
          Вспомнили пароль?
          <Link to="/login" className={styles.link}> Войти</Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPasswordPage;