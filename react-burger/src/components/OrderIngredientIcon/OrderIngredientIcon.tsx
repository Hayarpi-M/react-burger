import styles from './OrderIngredientIcon.module.css';
import { FC } from 'react';
import { TIngredient } from '../../types/ingredients';

interface Props {
  ingredient: TIngredient;
  index: number;
  extra?: number;
}

const OrderIngredientIcon: FC<Props> = ({ ingredient, index, extra }) => {
  return (
    <div className={styles.icon} style={{ zIndex: 6 - index }}>
      <img src={ingredient.image} alt={ingredient.name} />
      {extra && <span className={styles.counter}>+{extra}</span>}
    </div>
  );
};

export default OrderIngredientIcon;
