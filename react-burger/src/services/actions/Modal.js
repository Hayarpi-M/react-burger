export const setCurrentIngredient = (item) => ({
  type: 'SET_CURRENT_INGREDIENT',
  payload: item,
});

export const clearCurrentIngredient = () => ({
  type: 'CLEAR_CURRENT_INGREDIENT',
});
