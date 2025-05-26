import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesIngredientCard from './IngredientCard.module.css';


const IngredientCard = ({ item, onClick, count }) => {

  return (
      <div onClick={() => {onClick(item)}} className={stylesIngredientCard.IngredientCardWrapper}>
          {count>0 && <Counter count={count} size="default" />}
          <img src={item.image} alt={item.name} className="ml-4 mr-4" />
          <div className= {`mt-1 mb-1 ${stylesIngredientCard.priceWrapper}`}>
              <span className="text text_type_digits-default mr-2">{item.price}</span>
              <CurrencyIcon type="primary" />
          </div>
          <p className="text text_type_main-default">{item.name}</p>
      </div>
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
    count: PropTypes.number.isRequired,
};
  

export default IngredientCard;