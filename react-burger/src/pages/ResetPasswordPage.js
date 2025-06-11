import React, { useState } from 'react';
import styles from './FormPage.module.css';
import { Link } from 'react-router-dom';
import {BASE_URL} from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RESET_PASSWORD_COMPLETE } from '../services/actions/auth';
import { Input, PasswordInput,Button} from '@ya.praktikum/react-developer-burger-ui-components';


const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const canResetPassword = useSelector((state) => state.auth.canResetPassword);
  const email = useSelector((state) => state.auth.resetEmail);

  useEffect(() => {
    if (!canResetPassword) {
      navigate('/forgot-password');
    }
  }, [canResetPassword, navigate]);

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
        dispatch({ type: RESET_PASSWORD_COMPLETE }); 
        navigate('/login');
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

        <PasswordInput
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите новый пароль"
        />

        <Input
          type="text"
          placeholder="Введите код из письма"
          value={code}
          name="code"
          onChange={(e) => setCode(e.target.value)}
          required
        />

        {error && <p className={styles.error}>{error}</p>}

        <Button htmlType="submit" type="primary" size="medium" disabled={loading}>
          {loading ? 'Сохранение...' : 'Сохранить'}
        </Button>

        <p className={styles.footer}>
          Вспомнили пароль?
          <Link to="/login" className={styles.link}> Войти</Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPasswordPage;