import React, { useRef, FC } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ConstructorItem.module.css';

type TConstructorItemProps = {
  item: {
    uuid: string;
    name: string;
    price: number;
    image: string;
  };
  index: number;
  moveIngredient: (fromIndex: number, toIndex: number) => void;
  onDelete: (uuid: string) => void;
};

type DragItem = {
  index: number;
  uuid: string;
};

const ConstructorItem: FC<TConstructorItemProps> = ({ item, index, moveIngredient, onDelete }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DragItem>({
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

export default ConstructorItem;