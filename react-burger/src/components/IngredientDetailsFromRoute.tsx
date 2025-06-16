import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails from './IngredientDetails/IngredientDetails';
import { RootState } from '../services/reducers/index';
import { TIngredient } from '../types/ingredients'

const IngredientDetailsFromRoute: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredient = useSelector((state:RootState) =>
    state.ingredients.items.find((item:TIngredient) => item._id === id)
  );

  if (!ingredient) {
    return <p className="text text_type_main-medium">Ингредиент не найден</p>;
  }

  return <IngredientDetails ingredient={ingredient} />;
};

export default IngredientDetailsFromRoute;
