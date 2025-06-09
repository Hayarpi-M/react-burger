import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../services/actions/auth';
import { useNavigate } from 'react-router-dom';
import styles from './FormPage.module.css';


function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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

        <input
          type="text"
          placeholder="Имя"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="E-mail"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
            role="button"
          >
            👁️
          </span>
        </div>

        <button type="submit" className={styles.button}>
          Зарегистрироваться
        </button>

        <p className={styles.footer}>
          Уже зарегистрированы?{' '}
          <Link to="/login" className={styles.link}>Войти</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;