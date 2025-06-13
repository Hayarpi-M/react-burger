import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails from './IngredientDetails/IngredientDetails';
import PropTypes from 'prop-types';

const IngredientDetailsFromRoute = () => {
  const { id } = useParams();
  const ingredient = useSelector(state =>
    state.ingredients.items.find(item => item._id === id)
  );

  if (!ingredient) {
    return <p className="text text_type_main-medium">Ингредиент не найден</p>;
  }

  return <IngredientDetails ingredient={ingredient} />;
};

IngredientDetailsFromRoute.propTypes = {};

export default IngredientDetailsFromRoute;
