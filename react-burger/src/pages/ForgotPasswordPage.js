import React, { useState } from 'react';
import styles from './FormPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../services/actions/auth';
import PropTypes from 'prop-types';


const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await dispatch(forgotPassword(email));
    setLoading(false);

    if (result.success) {
      navigate('/reset-password', { state: { email } });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Восстановление пароля</h2>

        <input
          type="email"
          placeholder="Укажите e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        {error && <p className={styles.error}>{error}</p>}

        <button type='submit' className={styles.button} disabled={loading}>
          {loading? 'Отправка...' : 'Восстановить'}
        </button>

        <p className={styles.text}>
          Вспомнили пароль?{' '}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};

ForgotPasswordPage.propTypes = {};

export default ForgotPasswordPage;