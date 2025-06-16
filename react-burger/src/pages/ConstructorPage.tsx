import React from 'react';
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';

const ConstructorPage: React.FC = () => {
  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5 app-title">Соберите бургер</h1>
      <div className="app-wrapper">
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </>
  );
};


export default ConstructorPage;