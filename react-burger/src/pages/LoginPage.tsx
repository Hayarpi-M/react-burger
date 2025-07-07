import {useState, FormEvent, ChangeEvent} from 'react';
//import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { Link, useLocation, useNavigate, Location } from 'react-router-dom';
import { login } from '../services/actions/auth';
import styles from './FormPage.module.css';
import { clearOrderIntent } from '../services/actions/orderIntent';
import { makeOrder } from '../services/actions/Order';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { AppDispatch, RootState } from '../types/store';

interface ILocationState {
  from?: Location;
  tryOrder?: boolean;
}

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation(); 

  const state = location.state as ILocationState;
  const from = state?.from?.pathname || '/';
  const tryOrder = state?.tryOrder;
  const orderIngredientIds = useAppSelector((state) => state.orderIntent.ingredientIds);


  const handleLoginSuccess = () => {
    console.log('✅ handleLoginSuccess called');
    console.log('from:', from);
    console.log('tryOrder:', tryOrder);
    console.log('orderIngredientIds:', orderIngredientIds);

    if (tryOrder && orderIngredientIds.length > 0) {
      console.log('Placing order after login...');
      dispatch(makeOrder(orderIngredientIds));
      dispatch(clearOrderIntent());
      navigate('/', { replace: true }); // or open modal directly
    } else {
      console.log('➡️ Navigating to:', from);
      navigate(from, { replace: true });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(email, password, handleLoginSuccess));
  }
  const inputFix = {} as React.HTMLProps<HTMLInputElement>;

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Вход</h2>

        <Input 
          {...{
            type: 'email',
            placeholder: 'E-mail',
            value: email,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
            extraClass: 'mb-6',
            required: true,
          } as any}
        />
        <div className={styles.passwordWrapper}>
          <PasswordInput
            value={password}
            name="password"
            extraClass="mb-6"
            required
            onChange={(e) => {setPassword(e.target.value)}}
          />
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