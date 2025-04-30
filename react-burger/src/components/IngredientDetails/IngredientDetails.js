import React from 'react';
import PropTypes from 'prop-types';
import styles from './IngredientDetails.module.css';

const IngredientDetails = ({ ingredient }) => {
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

IngredientDetails.propTypes = {
    ingredient: PropTypes.shape({
      image_large: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      calories: PropTypes.number.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
    }),
};

export default IngredientDetails;