import { useParams } from 'react-router-dom';
//import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';
import { useEffect } from 'react';
import { getIngredients } from '../services/actions/BurgerIngredients';
import { AppDispatch, RootState } from '../types/store';
import { TIngredient } from '../types/ingredients'; 

const IngredientPage: React.FC  = () => {
  const { id } = useParams<{id: string}>();
  //const dispatch = useDispatch<AppDispatch>();
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.ingredients.items);
  const itemsRequest = useAppSelector((state) => state.ingredients.itemsRequest);
  const itemsFailed = useAppSelector((state) => state.ingredients.itemsFailed);

  // Загружаем ингредиенты, если их ещё нет
  useEffect(() => {
    if (!items.length) {
      dispatch(getIngredients());
    }
  }, [dispatch, items.length]);

  // Пока идёт запрос
  if (itemsRequest) {
    return <p>Загрузка ингредиентов...</p>;
  }

  // Ошибка при загрузке
  if (itemsFailed) {
    return <p>Ошибка загрузки ингредиентов</p>;
  }

  // Когда всё загрузилось — ищем нужный ингредиент
  const ingredient: TIngredient | undefined = items.find((item:TIngredient) => item._id === id);

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