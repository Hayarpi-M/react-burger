import styles from './FeedStats.module.css';
import { FC } from 'react';

interface Props {
  total: number;
  today: number;
}

const FeedStats: FC<Props> = ({ total, today }) => {
  return (
    <div className={styles.stats}>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p className="text text_type_digits-large">{total}</p>
      </div>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p className="text text_type_digits-large">{today}</p>
      </div>
    </div>
  );
};

export default FeedStats;