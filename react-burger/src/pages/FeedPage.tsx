// src/pages/FeedPage.tsx

import React, { useEffect } from 'react';
import styles from './FeedPage.module.css';
//import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'; 
import { wsConnect, wsDisconnect } from '../services/actions/wsAction';
import OrderCard from '../components/OrderCard/OrderCard';
import OrderStatusList from '../components/OrderStatusList/OrderStatusList'; // renamed from OrderStats to OrderStatusList
import FeedStats from '../components/FeedStats/FeedStats'; // renamed from OrderStats to FeedStats
import {RootState} from '../types/store';
import { TOrder } from '../types/order';

const FeedPage = () => {
  const dispatch = useAppDispatch();

  const { orders, total, totalToday } = useAppSelector((state) => state.wsProfile.public);

  const doneOrders = orders?.filter((o: TOrder) => o.status === 'done').map((o: TOrder) => o.number).slice(0, 5) || [];
  const pendingOrders = orders?.filter((o: TOrder) => o.status === 'pending').map((o: TOrder) => o.number).slice(0, 5) || [];

  useEffect(() => {
    dispatch(wsConnect('wss://norma.nomoreparties.space/orders/all'));

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <h1 className={`text text_type_main-large mb-5 ${styles.heading}`}>Лента заказов</h1>
      <div className={styles.content}>
        <div className={styles.orderList}>
          {orders?.map((order: TOrder) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
        <div className={styles.sidebar}>
          <OrderStatusList doneOrders={doneOrders} pendingOrders={pendingOrders} />
          <FeedStats total={total} today={totalToday} />
        </div>
      </div>
    </div>
  );
};

export default FeedPage;