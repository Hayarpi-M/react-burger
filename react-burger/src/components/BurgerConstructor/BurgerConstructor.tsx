import { useMemo, useEffect } from 'react';
import React from 'react';
//import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { useNavigate, useLocation } from 'react-router-dom';
import { removeIngredient } from '../../services/actions/BurgerConstructor';
import { makeOrder } from '../../services/actions/Order';
import {setOrderIntent} from '../../services/actions/orderIntent';
import { getCookie } from '../../utils/cookies';

// inside the component
import {
  addIngredient,
  reorderIngredients,
  clearConstructor,
} from '../../services/actions/BurgerConstructor';

import ConstructorItem from './ConstructorItem/ConstructorItem';
import BunPreview from './BunPreview/BunPreview';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { AppDispatch, RootState } from '../../types/store';
import { TIngredientConstructor, TIngredient } from '../../types/ingredients';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';

const BurgerConstructor: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { bun, ingredients = [] } = useAppSelector((state) => state.constructors);
  const allIngredients = useAppSelector((state) => state.ingredients.items);
  const { order, isModalOpen, orderRequest } = useAppSelector((state) => state.order);
  const orderNumber = order?.number;
  const isAuthenticated = Boolean(getCookie('accessToken'));
  

  const handleOrderClick = () => {
    const ingredientIds = ingredients.map((item: TIngredientConstructor) => item._id);
    
    if (bun) {
      ingredientIds.unshift(bun._id);
      ingredientIds.push(bun._id);
    }

    if (!isAuthenticated) {
      dispatch(setOrderIntent(ingredientIds));
      navigate('/login', { state: { from: location, tryOrder: true } });
      return;
    }

    dispatch(makeOrder(ingredientIds));
  };

  useEffect(() => {
    if (  !allIngredients.length) {
      <>'Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа.'</>
    }
  }, [allIngredients, dispatch]);

  const [, dropRef] = useDrop<TIngredient>({
    accept: ['ingredient', 'sort'],
    drop(item, monitor) {
      const dragType = monitor.getItemType();

      if (dragType === 'ingredient') {
        dispatch(addIngredient(item));
      }
    },
  });

  const handleDelete = (uuid: string) => {
    dispatch(removeIngredient(uuid));
  }

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
    const newOrder = update(ingredients, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, ingredients[dragIndex]],
      ],
    });
    dispatch(reorderIngredients(newOrder));
  };

  const totalPrice = useMemo(() => {
    return (
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce((sum: number, item:TIngredient) => sum + item.price, 0)
    );
  }, [bun, ingredients]);

  const closeModal = () => {
    dispatch({ type: 'CLOSE_ORDER_MODAL' });
    dispatch(clearConstructor()); 
  };
  

  return (
    <section className={styles.wrapper}>
      <div ref={dropRef as unknown as React.Ref<HTMLDivElement>} className={styles.constructorBlock} >
        { (!bun && ingredients.length === 0) ? (
            <p className={`text text_type_main-default text_color_inactive ${styles.constructorText}`}>
              Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа.
            </p>
          ) : (
        <>    
        {bun && (
          <div className={styles.lockedItem}>
            <BunPreview type="top" bun={bun} />
          </div>
        )}

        <div className={styles.scroll}>
          {ingredients.map((item: TIngredientConstructor, index: number) => (
            <ConstructorItem
              key={item.uuid}
              item={item}
              index={index}
              moveIngredient={moveIngredient}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {bun && (
          <div className={styles.lockedItem}>
            <BunPreview type="bottom" bun={bun} />
          </div>
        )}
        </>
        )}
      </div>

      <div className={styles.total}>
        <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
        <CurrencyIcon type="primary" />
        <div className="ml-10">
          <Button htmlType="button" type="primary" size="medium" onClick={handleOrderClick} disabled={orderRequest}>
            {orderRequest ? 'Оформляется...' : 'Оформить заказ'}
          </Button>
        </div>
      </div>

      {(orderRequest || (isModalOpen && orderNumber)) && (
        <Modal onClose={closeModal}>
          {orderRequest ? (
            <p className="text text_type_main-medium p-10">⏳ Оформляем ваш заказ...</p>
          ) : (
            <OrderDetails orderNumber={orderNumber} />
          )}
        </Modal>
      )}
    </section>
  );
};


export default BurgerConstructor;