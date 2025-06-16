import React from 'react';
import { TIngredient } from '../../types/ingredients';
import styles from './IngredientDetails.module.css';

type IngredientDetailsProps = {
  ingredient: TIngredient | null;
};

const IngredientDetails: React.FC<IngredientDetailsProps> = ({ ingredient }) => {
    if (!ingredient) {
        return null;
    }
    return (
        <div className={styles.container}>
            <img src={ingredient.image_large} alt={ingredient.name}  />
            <h3 className="text text_type_main-medium mt-4">{ingredient.name}</h3>
            <ul className={styles.nutrition}>
                <li className={styles.nutritionItem}>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <p className="text text_type_digits-default">{ingredient.calories}</p>
                </li>
                <li className={styles.nutritionItem}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default">{ingredient.proteins}</p>
                </li>
                <li className={styles.nutritionItem}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default">{ingredient.fat}</p>
                </li>
                <li className={styles.nutritionItem}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
}

export default IngredientDetails;