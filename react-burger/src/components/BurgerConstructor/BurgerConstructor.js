import React, { useState} from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = () => {
    const [order, setOrder] = useState(null);
    const handleOrder = (newOrder) => {
        setOrder(newOrder);
    }
    const closeModal = () => {
        setOrder(null);
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.constructor}>
                <div className={styles.lockedItem}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={20}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    />
                </div>

                <div className={styles.scroll}>
                    <div className={styles.ingredient}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Соус традиционный галактический"
                            price={30}
                            thumbnail="https://code.s3.yandex.net/react/code/sauce-01.png"
                        />
                    </div>
                    <div className={styles.ingredient}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Мясо бессмертных моллюсков Protostomia"
                            price={300}
                            thumbnail="https://code.s3.yandex.net/react/code/meat-01.png"
                        />
                    </div>
                    <div className={styles.ingredient}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Плоды Фалленианского дерева"
                            price={80}
                            thumbnail="https://code.s3.yandex.net/react/code/sp_1.png"
                        />
                    </div>
                    <div className={styles.ingredient}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Хрустящие минеральные кольца"
                            price={80}
                            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
                        />
                    </div>
                    <div className={styles.ingredient}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text="Хрустящие минеральные кольца"
                            price={80}
                            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
                        />
                    </div>
                </div>

                <div className={styles.lockedItem}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={20}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    />
                </div>
            </div>

            <div className={styles.total}>
                <p className="text text_type_digits-medium mr-2">610</p>
                <CurrencyIcon type="primary" />
                <div className="ml-10">
                    <Button htmlType="button" type="primary" size="medium" onClick={handleOrder} >
                        Оформить заказ
                    </Button>
                </div>
            </div>
            {order && (
                <Modal onClose={closeModal}>
                   
                    <OrderDetails data={order} />
                </Modal>
            )}
        </div>
    );
};

OrderDetails.propTypes = {
    data: PropTypes.object.isRequired,
  };

export default BurgerConstructor;

