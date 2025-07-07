import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './OrderPage.module.css'; // Create or adjust styles if needed
import { useDispatch, useSelector } from 'react-redux';
import { wsConnect, wsDisconnect } from '../services/actions/wsAction';
import { TIngredient } from '../types/ingredients';
import { TOrder } from '../types/order';
import OrderIngredientIcon from '../components/OrderIngredientIcon/OrderIngredientIcon';
import { formatDate } from '../utils/data';
import {RootState} from '../types/store'

const WS_URL = 'wss://norma.nomoreparties.space/orders/all';

const OrderPageFromFeed = () => {
  const { number } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnect(WS_URL));
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  const orders: TOrder[] = useSelector((state: RootState) => state.wsProfile.public.orders);
  const ingredients: TIngredient[] = useSelector((state: any) => state.ingredients.items);

  const order = orders?.find((order: TOrder) => order.number === Number(number));

  if (!order) {
    return <p className="text text_type_main-medium mt-10">Заказ не найден...</p>;
  }

  const orderIngredients = order.ingredients
    .map(id => ingredients.find(ing => ing._id === id))
    .filter(Boolean) as TIngredient[];

  const totalPrice = orderIngredients.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={styles.container}>
      <p className={styles.orderNumber}>#{order.number}</p>
      <h2 className={styles.orderName}>{order.name}</h2>
      <p className={`text text_type_main-default mb-6 ${order.status === 'done' ? styles.done : ''}`}>
        {order.status === 'done' ? 'Выполнен' : 'Готовится'}
      </p>

      <h3 className={styles.sectionTitle}>Состав:</h3>
      <div className={styles.ingredientsList}>
        {Object.entries(
          order.ingredients.reduce((acc: { [key: string]: number }, id: string) => {
            acc[id] = (acc[id] || 0) + 1;
            return acc;
          }, {})
        ).map(([id, quantity], index) => {
          const ingredient = ingredients.find(ing => ing._id === id);
          if (!ingredient) return null;
          return (
            <div key={id} className={styles.ingredientRow}>
              <div className={styles.ingredientInfo}>
                <img src={ingredient.image} alt={ingredient.name} className={styles.ingredientImage} />
                <span className="text text_type_main-default">{ingredient.name}</span>
              </div>
              <div className={styles.ingredientPrice}>
                <span className="text text_type_digits-default">
                  {quantity} x {ingredient.price}
                </span>
                <span className="text text_type_digits-default">💰 {ingredient.price * quantity}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.footer}>
        <span >
          {formatDate(order.createdAt)}
        </span>
        <span >💰 {totalPrice}</span>
      </div>
    </div>
  );
};

export default OrderPageFromFeed;