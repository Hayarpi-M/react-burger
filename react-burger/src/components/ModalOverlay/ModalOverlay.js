import React from 'react';
import styles from './ModalOverlay.module.css';

const ModalOverlay = ({ onClose }) => { 
    return (
        <div className={styles.overlay} onClick={onClose}></div>
    )
}

export default ModalOverlay;