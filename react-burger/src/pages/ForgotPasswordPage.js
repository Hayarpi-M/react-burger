import React, { useState } from 'react';
import styles from './FormPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../services/actions/auth';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
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
      navigate('/reset-password' );
      console.log(result)
    } else {
      setError(result.message);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Восстановление пароля</h2>

        <Input
          type="email"
          placeholder="Укажите e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          required
        />
        {error && <p className={styles.error}>{error}</p>}

        <Button type="primary" size="medium" htmlType="submit" disabled={loading}>
          {loading ? 'Отправка...' : 'Восстановить'}
        </Button>

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