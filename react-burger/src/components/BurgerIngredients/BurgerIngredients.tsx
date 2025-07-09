import React, { useEffect, useState, useRef, RefObject } from 'react';
//import { useSelector, useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import IngredientSection from './IngredientSection/IngredientSection';
import { getIngredients } from '../../services/actions/BurgerIngredients';
import { useNavigate, useLocation } from 'react-router-dom';
import { TIngredient } from '../../types/ingredients';
import { AppDispatch, RootState } from '../../types/store';


const BurgerIngredients: React.FC = () => {
    //const dispatch = useDispatch<AppDispatch>();
    const dispatch = useAppDispatch();
    const { items, itemsRequest, itemsFailed } = useAppSelector((state) => state.ingredients);
    const [current, setCurrent] = useState('bun');
    const constructorItems = useAppSelector((state) => state.constructors);
    const { bun, ingredients } = constructorItems;
    const navigate = useNavigate();
    const location = useLocation();

    const getCount = (ingredient: TIngredient): number => {
        if (ingredient.type === 'bun') {
            return bun?._id === ingredient._id ? 2 : 0;
        }
        return ingredients.filter((item: TIngredient) => item._id === ingredient._id).length;
    };

    const bunRef = useRef<HTMLHeadingElement>(null);
    const sauceRef = useRef<HTMLHeadingElement>(null);
    const mainRef = useRef<HTMLHeadingElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleTabClick = (value: string) => {
        if (value === 'bun' || value === 'sauce' || value === 'main') {
            setCurrent(value);
            if (value === 'bun') bunRef.current?.scrollIntoView({ behavior: 'smooth' });
            if (value === 'sauce') sauceRef.current?.scrollIntoView({ behavior: 'smooth' });
            if (value === 'main') mainRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
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

    const handleIngredientClick = (ingredient: TIngredient) => {
        navigate(`/ingredients/${ingredient._id}`, { state: { background: location } });
    };

   

    const filteredIngredients = (type: TIngredient['type']): TIngredient[] =>
        (items || []).filter((item: TIngredient) => item.type === type);
    
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
        
        </section>
    );
};

export default BurgerIngredients;












