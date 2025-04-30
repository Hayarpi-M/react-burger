import React, { useState, useEffect  } from 'react';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css';
//import { ingredients } from '../../utils/data';
import { BASE_URL } from '../../utils/constants';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails'


const IngredientCard = ({ item, onClick }) => {
    return (
        <div onClick={() => {onClick(item)}} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px', width: '40%' }}>
            <Counter count={1} size="default" />
            <img src={item.image} alt={item.name} className="ml-4 mr-4" />
            <div className="mt-1 mb-1" style={{ display: 'flex', justifyContent: 'center' }}>
                <span className="text text_type_digits-default mr-2">{item.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">{item.name}</p>
        </div>
    );
};

const BurgerIngredients = () => {
    const [current, setCurrent] = useState('all');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const handleIngredientClick = (ingredient) => {
        setSelectedIngredient(ingredient);
    };
    const closeModal = () => {
        setSelectedIngredient(null);
    };

    useEffect(() => {
        getIngredients();
    }, []);

    const getIngredients = async () => {
        setIsLoading(true);
        setHasError(false);
        try {
        //const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
        const res = await fetch(`${BASE_URL}/ingredients`);
        const json = await res.json();
        setData(json.data);
        } catch (e) {
        setHasError(true);
        } finally {
        setIsLoading(false);
        }
    };


    const filteredIngredients = (type) =>
        data.filter((item) => item.type === type);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (hasError) {
        return <p>Ошибка загрузки ингредиентов</p>;
    }

    return (
        <section className={styles.containerIngred}>

            <div style={{ display: 'flex' }} className="mb-10">
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <div className={styles.scrollY}>
                {(current === 'all' || current === 'bun') && (
                    <>
                        <h2 className="text text_type_main-medium mb-6">Булки</h2>
                        <div className={styles.ingredientGrid}>
                            {filteredIngredients('bun').map((item) => (
                                <IngredientCard item={item} key={item._id} onClick={handleIngredientClick} />
                            ))}
                        </div>
                    </>
                )}
                {(current === 'all' || current === 'sauce') && (
                    <>
                        <h2 className="text text_type_main-medium mb-6">Соусы</h2>
                        <div className={styles.ingredientGrid}>
                            {filteredIngredients('sauce').map((item) => (
                                <IngredientCard item={item} key={item._id} onClick={handleIngredientClick} />
                            ))}
                        </div>
                    </>
                )}
                {(current === 'all' || current === 'main') && (
                    <>
                        <h2 className="text text_type_main-medium mb-6">Начинки</h2>
                        <div className={styles.ingredientGrid}>
                            {filteredIngredients('main').map((item) => (
                                <IngredientCard item={item} key={item._id} onClick={handleIngredientClick} />
                            ))}
                        </div>
                    </>
                )}
            </div>
            {selectedIngredient && (
                <Modal title="Детали ингредиента" onClose={closeModal}>
                   
                    <IngredientDetails ingredient={selectedIngredient} />
                </Modal>
            )}
        </section>
    );
};

IngredientCard.propTypes = {
    item: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
  };
  

export default BurgerIngredients;












