import React, { FC, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import IngredientCard from '../IngredientCard/IngredientCard';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { TIngredient } from '../../../types/ingredients';

/*type TIngredient = {
  _id: string;
  name: string;
  image: string;
  price: number;
  type: string;
};*/

type TDraggableIngredientProps = {
  item: TIngredient;
  onClick: (item: TIngredient) => void;
  count: number;
};

const DraggableIngredient: FC<TDraggableIngredientProps> = ({ item, onClick, count }) => {
  const [{ isDragging }, dragRef, dragPreviewRef] = useDrag({
    type: 'ingredient',
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    dragPreviewRef(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreviewRef]);

  return (
    <div ref={dragRef as unknown as React.Ref<HTMLDivElement>} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <IngredientCard item={item} onClick={onClick} count={count} />
    </div>
  );
};


export default DraggableIngredient;