import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { useEffect } from 'react'; 
import { removeIngredient } from '../../services/actions/BurgerConstructor';
import { makeOrder } from '../../services/actions/Order';
import { useNavigate, useLocation } from 'react-router-dom';
import {setOrderIntent} from '../../services/actions/orderIntent'

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

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const { bun, ingredients = [] } = useSelector((state) => state.constructors);
  console.log(useSelector((state) => state.constructors))
  const allIngredients = useSelector((state) => state.ingredients.items);
  const { order, orderRequest, orderFailed, isModalOpen } = useSelector((state) => state.order);
  const orderNumber = order?.number;
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user;
  

  const handleOrderClick = () => {
    const ingredientIds = ingredients.map(item => item._id);
    
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

  const [{ isOver }, dropRef] = useDrop({
    accept: ['ingredient', 'sort'],
    drop(item, monitor) {
      const dragType = monitor.getItemType();

      if (dragType === 'ingredient') {
        dispatch(addIngredient(item));
      }
    },
  });

  const handleDelete = (uuid) => {
    dispatch(removeIngredient(uuid));
  }

  const moveIngredient = (dragIndex, hoverIndex) => {
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
      ingredients.reduce((sum, item) => sum + item.price, 0)
    );
  }, [bun, ingredients]);

  const closeModal = () => {
    dispatch({ type: 'CLOSE_ORDER_MODAL' });
    dispatch(clearConstructor()); 
  };
  

  return (
    <section className={styles.wrapper}>
      <div ref={dropRef} className={styles.constructor} >
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
          {ingredients.map((item, index) => (
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
          <Button htmlType="button" type="primary" size="medium" onClick={handleOrderClick}>
            Оформить заказ
          </Button>
        </div>
      </div>

      {isModalOpen && orderNumber && (
        <Modal onClose={closeModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
};


export default BurgerConstructor;