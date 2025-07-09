import styles from './OrderStatusList.module.css';
import { FC } from 'react';

interface Props {
  doneOrders: number[];
  pendingOrders: number[];
}

const OrderStatusList: FC<Props> = ({ doneOrders, pendingOrders }) => {
  return (
    <div className={styles.statuses}>
      <div>
        <h3 className="text text_type_main-medium mb-2">Готовы:</h3>
        <ul className={styles.listDone}>
          {doneOrders.map((num) => (
            <li key={num} className="text text_type_digits-default text_color_success">
              {num}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text text_type_main-medium mb-2">В работе:</h3>
        <ul className={styles.listPending}>
          {pendingOrders.map((num) => (
            <li key={num} className="text text_type_digits-default">{num}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderStatusList;