import React from 'react';
import './App.css';
import AppHeader from './components/AppHeader/AppHeader'
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor'

function App() {
  return (
    <div className="App">
      <AppHeader />
      <h1 className="text text_type_main-large mt-10 mb-5 app-title">Соберите бургер</h1>
      <div className="app-wrapper" >
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </div>
  );
}

export default App;
