import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import IngredientSection from './IngredientSection/IngredientSection';
import { getIngredients } from '../../services/actions/BurgerIngredients';


const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const { items, itemsRequest, itemsFailed } = useSelector((state) => state.ingredients);
    const [current, setCurrent] = useState('bun');
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const constructorItems = useSelector(state => state.constructors);
    const { bun, ingredients } = constructorItems;

    const getCount = (ingredient) => {
        if (ingredient.type === 'bun') {
            return bun?._id === ingredient._id ? 2 : 0;
        }
        return ingredients.filter(item => item._id === ingredient._id).length;
    };

    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);
    const scrollContainerRef = useRef(null);

    const handleTabClick = (section) => {
        setCurrent(section);
        if(section === "bun") (bunRef.current.scrollIntoView({ behavior: 'smooth' }));
        if(section === "sauce") sauceRef.current.scrollIntoView({ behavior: 'smooth' });
        if(section === "main") mainRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);
   
    useEffect(() => {
        const handleScroll = () => {
            if (!bunRef.current || !sauceRef.current || !mainRef.current || !scrollContainerRef.current) return;
            console.log('handleScroll function running...');
            const scrollTop = scrollContainerRef.current.getBoundingClientRect().top;

            const bunTop = Math.abs(bunRef.current.getBoundingClientRect().top - scrollTop);
            const sauceTop = Math.abs(sauceRef.current.getBoundingClientRect().top - scrollTop);
            const mainTop = Math.abs(mainRef.current.getBoundingClientRect().top - scrollTop);

            const min = Math.min(bunTop, sauceTop, mainTop);

            if (min === bunTop) {
                console.log(bunTop);
                setCurrent('bun');
            } else if (min === sauceTop) {
                console.log(sauceTop);
                setCurrent('sauce');
            } else {
                console.log('main');
                setCurrent('main');
            }
        };
        

        const container = scrollContainerRef.current;
        if (!container) return;
        container.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [scrollContainerRef.current]);

    const handleIngredientClick = (ingredient) => {
        setSelectedIngredient(ingredient);
    };

    const closeModal = () => {
        setSelectedIngredient(null);
    };

    const filteredIngredients = (type) =>
        (items || []).filter((item) => item.type === type);
    
    if (itemsRequest) return <p>Loading...</p>;
    if (itemsFailed) return <p>Ошибка загрузки ингредиентов</p>;

    return (
        <section className={styles.containerIngred}>

            <div className={`mb-10 ${styles.tabWrapper}`}>
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

            <div className={styles.scrollY} ref={scrollContainerRef}>
                    
                        <IngredientSection
                            title="Булки"
                            items={filteredIngredients('bun')}
                            sectionRef={bunRef}
                            onClick={handleIngredientClick}
                            draggable
                            getCount={getCount}
                        />
                    
                        <IngredientSection
                            title="Соусы"
                            items={filteredIngredients('sauce')}
                            sectionRef={sauceRef}
                            onClick={handleIngredientClick}
                            draggable
                            getCount={getCount}
                        />
                    
                        <IngredientSection
                            title="Начинки"
                            items={filteredIngredients('main')}
                            sectionRef={mainRef}
                            onClick={handleIngredientClick}
                            draggable
                            getCount={getCount}
                        />
                   
            </div>
            {selectedIngredient && (
                <Modal title="Детали ингредиента" onClose={closeModal}>
                   
                    <IngredientDetails ingredient={selectedIngredient} />
                </Modal>
            )}
        </section>
    );
};

export default BurgerIngredients;












