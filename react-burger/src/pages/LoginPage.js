import {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../services/actions/auth';
import { useLocation, useNavigate } from 'react-router-dom'; 
import styles from './FormPage.module.css';
import { clearOrderIntent } from '../services/actions/orderIntent';
import { makeOrder } from '../services/actions/Order';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation(); 
  const from = location.state?.from?.pathname || '/';
  const tryOrder = location.state?.tryOrder;
  const orderIngredientIds = useSelector(state => state.orderIntent.ingredientIds);


  const handleLoginSuccess = () => {
    console.log('✅ handleLoginSuccess called');
    console.log('from:', from);
    console.log('tryOrder:', tryOrder);
    console.log('orderIngredientIds:', orderIngredientIds);

    if (tryOrder && orderIngredientIds.length > 0) {
      console.log('🔁 Placing order after login...');
      dispatch(makeOrder(orderIngredientIds));
      dispatch(clearOrderIntent());
      navigate('/', { replace: true }); // or open modal directly
    } else {
      console.log('➡️ Navigating to:', from);
      navigate('/register');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, handleLoginSuccess));
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Вход</h2>

        <input 
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
          className={styles.input}
          required
        />
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            value={password}
            className={styles.input}
            required
            onChange={(e) => {setPassword(e.target.value)}}
          />
          <span 
            className={styles.togglePassword}
            role='button'
            onClick={() => setShowPassword(!showPassword)}  
          >
            👁️
          </span>
        </div>
        <button type="submit" className={styles.button}>
          Войти
        </button>
        <p className={styles.footer}>
          Вы — новый пользователь? 
          <Link to="/register" className={styles.link}> Зарегистрироваться</Link>
        </p>
        <p className={`${styles.footer} ${styles.footerSecond}`}>
          Забыли пароль? 
          <Link to="/forgot-password" className={styles.link}> Восстановить пароль</Link>
        </p>
      </form>
    </div>
  )
};

export default LoginPage;