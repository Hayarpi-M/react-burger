import React, { useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

type TModalProps = {
  title?: string;
  onClose: () => void;
  children: ReactNode;
};

const modalRoot = document.getElementById('modal-root'); 

const Modal: React.FC<TModalProps> = ({title, onClose, children}) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };

    }, [onClose]);

    if (!modalRoot) return null;
    
    return ReactDOM.createPortal ((
        <>
            <ModalOverlay onClose={onClose} />
            <div className={styles.wrapper}>
                <div className={styles.wrapperTop}>
                    <h3 className="text text_type_main-large">{title}</h3>   
                    <div onClick={onClose} className={styles.cursor}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </>
    ),
    modalRoot
    );
}   

export default Modal;