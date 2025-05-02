import { useState, useEffect, useRef  } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css';
//import { ingredients } from '../../utils/data';
import { BASE_URL } from '../../utils/constants';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import IngredientCard from './IngredientCard/IngredientCard';
import IngredientSection from './IngredientSection/IngredientSection';

const BurgerIngredients = () => {
    const [current, setCurrent] = useState('bun');
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
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);
    const handleTabClick = (section) => {
        setCurrent(section);
        if(section === "bun") bunRef.current.scrollIntoView({ behavior: 'smooth' });
        if(section === "sauce") sauceRef.current.scrollIntoView({ behavior: 'smooth' });
        if(section === "main") mainRef.current.scrollIntoView({ behavior: 'smooth' });
    }


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
                <Tab value="bun" active={current === 'bun'} onClick={handleTabClick}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={handleTabClick}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={handleTabClick}>
                    Начинки
                </Tab>
            </div>

            <div className={styles.scrollY}>
                    <>
                        <IngredientSection
                            title="Булки"
                            items={filteredIngredients('bun')}
                            sectionRef={bunRef}
                            onClick={handleIngredientClick}
                        />
                    </>
                    <>
                        <IngredientSection
                            title="Соусы"
                            items={filteredIngredients('sauce')}
                            sectionRef={sauceRef}
                            onClick={handleIngredientClick}
                        />
                    </>
                    <>
                        <IngredientSection
                            title="Начинки"
                            items={filteredIngredients('main')}
                            sectionRef={mainRef}
                            onClick={handleIngredientClick}
                        />
                    </>
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












