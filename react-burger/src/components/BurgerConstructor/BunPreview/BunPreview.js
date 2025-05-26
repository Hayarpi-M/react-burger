import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BunPreview.module.css';

const BunPreview = ({ bun, type }) => {
  return (
    <div className={styles.bunPreviewWrapper}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={`${bun.name} (${type === 'top' ? 'верх' : 'низ'})`}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
  );
};

BunPreview.propTypes = {
  bun: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.oneOf(['top', 'bottom']).isRequired,
};

export default BunPreview;
