import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/AppHeader/AppHeader'
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients'
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor'

function App() {
  return (
    <div className="App">
      <AppHeader />
      <h1 style={{textAlign: 'left'}} className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </div>
  );
}

export default App;
