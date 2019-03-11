import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    }).reduce((arr, cv) => {
        return arr.concat(cv);
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Start adding your ingredients</p>
    }

    return (
        <section className={classes.BurgerCard}>
            <div className={classes.Burger}>
                <BurgerIngredient type="bread-top" />
                {transformedIngredients}
                <BurgerIngredient type="bread-bottom" />
            </div>
        </section>
    )
}

export default burger;