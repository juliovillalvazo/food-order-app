import { useContext, useEffect, useState } from 'react';
import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setButtonIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((prev, curr) => {
        return prev + curr.amount;
    }, 0);

    const btnClasses = `${styles.button} ${
        btnIsHighlighted ? styles.bump : ''
    }`;

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return;
        }
        setButtonIsHighlighted(true);

        const timer = setTimeout(() => {
            setButtonIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [cartCtx.items]);

    return (
        <button onClick={props.onClick} className={btnClasses}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;
