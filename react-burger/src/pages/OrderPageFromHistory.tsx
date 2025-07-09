import { useParams } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'; 
import styles from './OrderPage.module.css';
import { RootState } from '../types/store';
import { TOrder } from '../types/order';
import { TIngredient } from '../types/ingredients';
import { getIngredients } from '../services/actions/BurgerIngredients';
import type { AppDispatch } from '../types/store';
import { formatDate } from '../utils/data'; 
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { wsProfileConnect, wsProfileDisconnect } from '../services/actions/wsAction';
import { getCookie } from '../utils/cookies';

const OrderPageFromHistory = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useAppDispatch();
  const [fetchedOrder, setFetchedOrder] = useState<TOrder | null>(null);
  useEffect(() => {
    const token = localStorage.getItem('accessToken') ?? getCookie('accessToken');
    if (token) {
      dispatch(wsProfileConnect(`wss://norma.nomoreparties.space/orders?token=${token}`));
    }

    return () => {
      dispatch(wsProfileDisconnect());
    };
  }, [dispatch]);
  const orders = useAppSelector((state) => state.wsProfile.profile.orders);
  const ingredientsList = useAppSelector((state) => state.ingredients.items);
  
  useEffect(() => {
    if (!ingredientsList || ingredientsList.length === 0) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredientsList.length]);

  const orderFromSocket = orders.find((o: TOrder) => o.number === Number(number));
  const order = orderFromSocket || fetchedOrder;
  
  useEffect(() => {
    if (!orderFromSocket && !fetchedOrder) {
      fetch(`https://norma.nomoreparties.space/api/orders/${number}`)
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(data => {
          if (data?.orders?.[0]) {
            setFetchedOrder(data.orders[0]);
          }
        })
        .catch(err => console.error('Order fetch error:', err));
    }
  }, [orderFromSocket, fetchedOrder, number]);
  if (!order) {
    return <p className="text text_type_main-medium mt-10">Заказ не найден</p>;
  }
  const ingredientMap: Record<string, TIngredient> = {};
  for (const ing of ingredientsList) {
    ingredientMap[ing._id] = ing;
  }

  const ingredientCountMap: Record<string, number> = {};
  for (const id of order.ingredients) {
    ingredientCountMap[id] = (ingredientCountMap[id] || 0) + 1;
  }

  // Prepare detailed ingredient info
  const detailedIngredients = Object.entries(ingredientCountMap)
    .map(([id, count]) => {
      const ingredient = ingredientMap[id];
      return ingredient ? { ...ingredient, count } : null;
    })
    .filter((item): item is TIngredient & { count: number } => !!item);

  const totalPrice = detailedIngredients.reduce((sum, item) => sum + item.price * item.count, 0);

  /*const ingredientData = order.ingredients
    .map(id => ingredientsList.find(item => item._id === id))
    .filter((item): item is TIngredient => !!item);

  const totalPrice = ingredientData.reduce((acc, item) => acc + item.price, 0);*/


  return (
    <div className={styles.page}>
      <p className="text text_type_digits-default mb-10">#{order.number}</p>
      <h1 className="text text_type_main-medium mb-3">{order.name}</h1>
      <p className={`text text_type_main-default mb-10 ${styles.status} ${order.status === 'done' ? styles.done : ''}`}>
        {order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : 'Создан'}
      </p>

      <h2 className="text text_type_main-medium mb-6">Состав:</h2>
      <div className={`${styles.ingredientsScroll} custom-scroll`}>
        {detailedIngredients.map((ingredient) => (
          <div className={styles.ingredientRow} key={ingredient._id}>
            <div className={styles.ingredientInfo}>
              <img src={ingredient.image} alt={ingredient.name} className={styles.image} />
              <p className="text text_type_main-default">{ingredient.name}</p>
            </div>
            <div className={styles.price}>
              <span className="text text_type_digits-default mr-2">
                {ingredient.count} x {ingredient.price}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <span className="text text_type_main-default text_color_inactive">
          {formatDate(order.createdAt)}
        </span>
        <span className="text text_type_digits-default ml-2">
          {totalPrice} ₽
        </span>
      </div>
    </div>
  );
};

export default OrderPageFromHistory;