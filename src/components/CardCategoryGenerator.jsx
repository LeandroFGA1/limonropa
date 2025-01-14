import React from 'react';
import CardCategory from './CardCategory'; 

const CardCategoryGenerator = () => {
    const numCards = 4;

    const renderCards = () => {
        let cardsArray = [];
        for (let i = 1; i <= numCards; i++) { 
            cardsArray.push(<CardCategory key={i} cardNumber={i} />); 
        }
        return cardsArray;
    };

    return (
        <div className="flex flex-wrap items-center justify-center gap-10 py-10">
            {renderCards()}
        </div>
    );
};

export default CardCategoryGenerator;
