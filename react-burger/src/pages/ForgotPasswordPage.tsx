import React, { useState, FormEvent, ChangeEvent  } from 'react';
import styles from './FormPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../services/actions/auth';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { AppDispatch } from '../services/store';


const ForgotPasswordPage: React.FC  = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

const result = await dispatch(forgotPassword(email)) as unknown as { success: boolean; message: string };
    setLoading(false);

    if (result.success) {
      navigate('/reset-password' );
      console.log(result)
    } else {
      setError(result.message);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Восстановление пароля</h2>

        <Input
          type="email"
          placeholder="Укажите e-mail"
          value={email}
          onChange={handleChange}
          name="email"
          required
          {...{} as any}
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


export default ForgotPasswordPage;