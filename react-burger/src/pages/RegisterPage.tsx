import { useState, FormEvent, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../services/actions/auth';
import styles from './FormPage.module.css';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { AppDispatch } from '../services/store';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(register(email, password, name));
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Произошла ошибка при регистрации.');
    }

    /*try {
      const response = await fetch('https://norma.nomoreparties.space/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        alert('Регистрация прошла успешно!');
        // TODO: Redirect to /login
      } else {
        alert('Ошибка: ' + data.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Произошла ошибка при регистрации.');
    }*/
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Регистрация</h2>

        <Input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          name="name"
          required
          {...({} as any)}
        />

        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          name="email"
          required
          {...({} as any)}
        />

        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />

        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>

        <p className={styles.footer}>
          Уже зарегистрированы?{' '}
          <Link to="/login" className={styles.link}>Войти</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;