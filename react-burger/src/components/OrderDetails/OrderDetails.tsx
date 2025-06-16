import React from 'react';
import styles from './OrderDetails.module.css';


type OrderDetailsProps = {
  orderNumber?: string | number;
};

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderNumber }) => {
    
    return (
        <div className={styles.container}>
            <p className="text text_type_digits-large mb-8">{orderNumber || 'Загрузка...'}</p>
            <p className="text text_type_main-large">
                идентификатор заказа
            </p>
            <div className={styles.iconWrapper}>
                <img src='/done.svg' alt='done'/>
            </div>
            <p className="text text_type_main-default mb-1">
                Ваш заказ начали готовить
            </p>
            <p className={`text text_type_main-default ${styles.textColorSecondary}`}>
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
}

export default OrderDetails;