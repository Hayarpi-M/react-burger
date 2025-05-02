import PropTypes from 'prop-types';
import IngredientCard from '../IngredientCard/IngredientCard';
import styles from '../BurgerIngredients.module.css';

const IngredientSection = ({ title, items, sectionRef, onClick }) => {
    return (
        <>
            <h2 ref={sectionRef} className={` ${styles.subtitle} text text_type_main-medium mb-2 mt-3`}>{title}</h2>
            <div className={styles.ingredientGrid}>
                {items.map((item) => (
                    <IngredientCard item={item} key={item._id} onClick={onClick} />
                ))}
            </div>
        </>
    )
};


export default IngredientSection;