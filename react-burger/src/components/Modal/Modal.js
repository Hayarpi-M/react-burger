import React, { useEffect  } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const modalRoot = document.getElementById('modal-root'); 

const Modal = ({title, onClose, children}) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };

    }, [onClose])
    
    return ReactDOM.createPortal ((
        <>
            <ModalOverlay onClose={onClose} />
            <div className={styles.wrapper}>
                <div className={styles.wrapperTop}>
                    <h3 className="text text_type_main-large">{title}</h3>   
                    <div onClick={onClose} style={{ cursor: 'pointer' }}>
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

Modal.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

export default Modal;