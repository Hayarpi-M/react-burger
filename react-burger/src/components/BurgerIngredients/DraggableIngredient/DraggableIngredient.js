import React from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import IngredientCard from '../IngredientCard/IngredientCard';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useEffect } from 'react'; 

const DraggableIngredient = ({ item, onClick, count }) => {
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
    <div ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <IngredientCard item={item} onClick={onClick} count={count} />
    </div>
  );
};

DraggableIngredient.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DraggableIngredient;