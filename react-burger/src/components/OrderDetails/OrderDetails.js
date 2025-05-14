import PropTypes from 'prop-types';
import styles from './OrderDetails.module.css';

const OrderDetails = ({ orderNumber }) => {
    
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
            <p className="text text_type_main-default" style={{color: '#8585AD'}}>
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default OrderDetails;