import { useReducer } from 'react';
import CartContext from './cart-context';

const initCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    let existingCartItemIndex;
    let updatedTotalAmount;
    let updatedItems;
    switch (action.type) {
        case 'ADD':
            updatedTotalAmount =
                state.totalAmount +
                action.payload.price * action.payload.amount;

            existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            );

            const existingCartItem = state.items[existingCartItemIndex];

            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.payload.amount,
                };
                updatedItems = [...state.items];

                updatedItems[existingCartItemIndex] = updatedItem;
            } else {
                updatedItems = [...state.items, action.payload];
            }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            };
        case 'REMOVE':
            existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.payload
            );

            const existingItem = state.items[existingCartItemIndex];

            updatedTotalAmount = state.totalAmount - existingItem.price;

            if (existingItem.amount === 1) {
                updatedItems = state.items.filter(
                    (item) => item.id !== action.payload
                );
            } else {
                const updatedItem = {
                    ...existingItem,
                    amount: existingItem.amount - 1,
                };

                updatedItems = [...state.items];

                updatedItems[existingCartItemIndex] = updatedItem;
            }

            return { items: updatedItems, totalAmount: updatedTotalAmount };
        case 'CLEAR':
            return initCartState;
        default:
            return { ...state };
    }
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        initCartState
    );
    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', payload: item });
    };
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', payload: id });
    };

    const clearCartHandler = () => {
        dispatchCartAction({ type: 'CLEAR' });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
