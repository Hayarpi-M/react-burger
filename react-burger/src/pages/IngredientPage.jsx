import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';

const IngredientPage = () => {
  const { id } = useParams();
  const ingredient = useSelector(state =>
    state.ingredients.items.find(item => item._id === id)
  );

  if (!ingredient) {
    return <p>Ингредиент не найден</p>;
  }

  return (
    <div style={{ paddingTop: '100px' }}>
      <h1 className="text text_type_main-large mb-5">Детали ингредиента</h1>
      <IngredientDetails ingredient={ingredient} />
    </div>
  );
};

export default IngredientPage;