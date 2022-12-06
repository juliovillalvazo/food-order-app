import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
import axios from 'axios';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const modalActions = (
        <div className={styles.actions}>
            <button onClick={props.onHideCart} className={styles['button-alt']}>
                Close
            </button>
            {hasItems && (
                <button className={styles.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        try {
            console.log(cartCtx.items);
            await axios.post('http://localhost:3003/api/order', {
                user: userData,
                orderedItems: [...cartCtx.items],
            });
        } catch (err) {
            console.log(err);
        }
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const cartItems = (
        <ul className={styles['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && (
                <Checkout
                    onConfirm={submitOrderHandler}
                    onCancel={props.onHideCart}
                />
            )}
            {!isCheckout && modalActions}
        </React.Fragment>
    );

    const isSubmittingModalContent = <p>Sending order data...</p>;
    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <div className={styles.actions}>
                <button className={styles.button} onClick={props.onHideCart}>
                    close
                </button>
            </div>
        </React.Fragment>
    );

    return (
        <Modal onClick={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;
