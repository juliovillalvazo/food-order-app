import React, { useRef, useState } from 'react';
import styles from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isNotFiveChars = (value) => value.length !== 5;

const Checkout = ({ onCancel, onConfirm }) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const cityInputRef = useRef();
    const postalCodeInputRef = useRef();

    const confirmHandler = (e) => {
        e.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = !isNotFiveChars(enteredPostalCode);
        const enteredStreetIsValid = !isEmpty(enteredStreet);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid,
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredCityIsValid &&
            enteredPostalCodeIsValid &&
            enteredStreetIsValid;

        if (!formIsValid) {
            return;
        }

        onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode,
        });
    };

    const nameControlClasses = `${styles.control} ${
        formInputsValidity.name ? '' : styles.invalid
    }`;

    const streetControlClasses = `${styles.control} ${
        formInputsValidity.street ? '' : styles.invalid
    }`;

    const cityControlClasses = `${styles.control} ${
        formInputsValidity.city ? '' : styles.invalid
    }`;

    const postalCodeControlClasses = `${styles.control} ${
        formInputsValidity.postalCode ? '' : styles.invalid
    }`;

    return (
        <form onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input id='name' type='text' ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input id='street' type='text' ref={streetInputRef} />
                {!formInputsValidity.street && (
                    <p>Please enter a valid street!</p>
                )}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input id='postal' type='postal' ref={postalCodeInputRef} />
                {!formInputsValidity.postalCode && (
                    <p>Please enter a valid postal code!</p>
                )}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input id='city' type='text' ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={styles.actions}>
                <button
                    className={styles.onCancel}
                    type='button'
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;
