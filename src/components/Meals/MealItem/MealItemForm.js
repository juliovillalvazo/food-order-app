import styles from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef, useState } from 'react';

const MealItemForm = (props) => {
    const amountInputRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;

        if (
            Number(enteredAmount) < 1 ||
            enteredAmount.trim().length === 0 ||
            Number(enteredAmount) > 5
        ) {
            setErrorMessage('Not a valid amount (1 - 5)');
            return;
        }

        props.onAddToCart(+enteredAmount);
    };
    return (
        <form onSubmit={submitHandler} className={styles.form}>
            <Input
                ref={amountInputRef}
                label='Amount'
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '2',
                    step: '1',
                    defaultValue: '1',
                }}
            />
            <button>+ Add</button>
            {errorMessage && <p>{errorMessage}</p>}
        </form>
    );
};

export default MealItemForm;
