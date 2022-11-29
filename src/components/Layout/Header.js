import React from 'react';
import styles from './Header.module.css';
import mealImg from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return (
        <React.Fragment>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={styles['main-image']}>
                <img src={mealImg} alt='delicious food' />
            </div>
        </React.Fragment>
    );
};

export default Header;
