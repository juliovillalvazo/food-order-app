import styles from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    const getMeals = useCallback(async () => {
        try {
            const { data } = await axios.get('http://localhost:3003/api/food');
            setMeals(data);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setHttpError(err.message);
        }
    }, []);

    useEffect(() => {
        getMeals();
    }, [getMeals]);

    if (isLoading) {
        return (
            <section className={styles['meals-loading']}>
                <p>loading...</p>
            </section>
        );
    }

    if (httpError) {
        return (
            <section className={styles['meals-error']}>
                <p>{httpError}</p>
            </section>
        );
    }

    const mealsList = meals.map((meal) => (
        <MealItem
            key={meal._id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
            id={meal._id}
        />
    ));
    return (
        <section className={styles.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
