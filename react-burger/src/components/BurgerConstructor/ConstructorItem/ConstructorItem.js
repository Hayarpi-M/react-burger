import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ConstructorItem.module.css';

const ConstructorItem = ({ item, index, moveIngredient, onDelete }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'sort',
    hover(draggedItem) {
      if (draggedItem.index === index) return;
      moveIngredient(draggedItem.index, index);
      draggedItem.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'sort',
    item: { uuid: item.uuid, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} className={styles.item} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => onDelete(item.uuid)}
      />
    </div>
  );
};

ConstructorItem.propTypes = {
  item: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  moveIngredient: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ConstructorItem;