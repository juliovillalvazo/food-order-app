import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import { Fragment } from 'react';

const Backdrop = (props) => {
    return <div onClick={props.onClick} className={styles.backdrop}></div>;
};

const ModalOverlay = (props) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(
                <Backdrop onClick={props.onClick} />,
                portalElement
            )}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalElement
            )}
        </Fragment>
    );
};

export default Modal;
