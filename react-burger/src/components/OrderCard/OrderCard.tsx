import styles from './OrderCard.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderIngredientIcon from '../OrderIngredientIcon/OrderIngredientIcon';
import { Link, useLocation } from 'react-router-dom';
import { FC, useMemo } from 'react';
import { TIngredient } from '../../types/ingredients';
import { TOrder } from '../../types/order';
import { useAppSelector } from '../../hooks/redux-hooks'; 

interface Props {
  order: TOrder;
  profileMode?: boolean;
}

const OrderCard: FC<Props> = ({ order, profileMode = false  }) => {
  const ingredients: TIngredient[] = useAppSelector((state) => state.ingredients.items);

  const orderIngredients = useMemo(
    () => order.ingredients.map(id => ingredients.find(ing => ing._id === id)).filter(Boolean) as TIngredient[],
    [order.ingredients, ingredients]
  );

  const totalPrice = useMemo(
    () => orderIngredients.reduce((sum, item) => sum + item.price, 0),
    [orderIngredients]
  );
  const location = useLocation();
  const path = profileMode ? `/profile/orders/${order.number}` : `/feed/${order.number}`;

  return (
    <Link to={path} state={{ background: location }} className={styles.card}>
      <div className={styles.header}>
        <span className="text text_type_digits-default">#{order.number}</span>
        <span className="text text_type_main-default text_color_inactive">{order.createdAt}</span>
      </div>
      <h3 className="text text_type_main-medium mt-2 mb-4">{order.name}</h3>
      {profileMode && (
        <p className={`text text_type_main-default mb-2 ${styles.status} ${order.status === 'done' ? styles.done : ''}`}>
          {order.status === 'done'
            ? 'Выполнен'
            : order.status === 'pending'
            ? 'Готовится'
            : 'Создан'}
        </p>
      )}
      <div className={styles.footer}>
        <div className={styles.ingredients}>
          {orderIngredients.slice(0, 5).map((ing, i) => (
            <OrderIngredientIcon key={i} ingredient={ing} index={i} />
          ))}
          {orderIngredients.length > 5 && (
            <OrderIngredientIcon
              ingredient={orderIngredients[5]}
              index={5}
              extra={orderIngredients.length - 5}
            />
          )}
        </div>
        <div className={styles.price}>
          <span className="text text_type_digits-default">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;