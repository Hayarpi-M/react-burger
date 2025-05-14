import PropTypes from 'prop-types';
import DraggableIngredient from '../DraggableIngredient/DraggableIngredient'; 
import IngredientCard from '../IngredientCard/IngredientCard'; 
import styles from '../BurgerIngredients.module.css';

const IngredientSection = ({ title, items, sectionRef, onClick, draggable, getCount }) => {
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

IngredientSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  sectionRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  onClick: PropTypes.func.isRequired,
  getCount: PropTypes.func.isRequired,
};


export default IngredientSection;