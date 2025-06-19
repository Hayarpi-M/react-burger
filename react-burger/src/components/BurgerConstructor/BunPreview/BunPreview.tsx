import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BunPreview.module.css';

type TBun = {
  name: string;
  price: number;
  image: string;
};

type BunPreviewProps = {
  bun: TBun;
  type: 'top' | 'bottom';
};

const BunPreview: React.FC<BunPreviewProps> = ({ bun, type }) => {
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

export default BunPreview;
