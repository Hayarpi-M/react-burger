import React from 'react';
import styles from './ModalOverlay.module.css';

type TModalOverlayProps = {
  onClose: () => void;
}; 

const ModalOverlay:React.FC<TModalOverlayProps> = ({ onClose }) => { 
    return (
        <div className={styles.overlay} onClick={onClose}></div>
    )
}
export default ModalOverlay;