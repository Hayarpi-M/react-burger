import React, { RefObject } from 'react';
import DraggableIngredient from '../DraggableIngredient/DraggableIngredient'; 
import IngredientCard from '../IngredientCard/IngredientCard'; 
import styles from '../BurgerIngredients.module.css';
import { TIngredient } from '../../../types/ingredients'; 

type TIngredientSectionProps = {
  title: string;
  items: TIngredient[];
  sectionRef: RefObject<HTMLHeadingElement | null>;
  onClick: (item: TIngredient) => void;
  draggable: boolean;
  getCount: (item: TIngredient) => number;
};

const IngredientSection:React.FC<TIngredientSectionProps> = ({ title, items, sectionRef, onClick, draggable, getCount }) => {
    return (
        <>
            <h2 ref={sectionRef} className={` ${styles.subtitle} text text_type_main-medium mb-2 mt-3`}>{title}</h2>
            <div className={styles.ingredientGrid}>
                {items.map((item) => draggable ? (
                        <DraggableIngredient key={item._id} item={item} onClick={onClick} count={getCount(item)}  />
                    ) : (
                        <IngredientCard key={item._id} item={item} onClick={onClick} count={getCount(item)} />
                    ))}
            </div>
        </>
    )
};

export default IngredientSection;