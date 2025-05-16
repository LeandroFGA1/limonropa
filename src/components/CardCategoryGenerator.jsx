import React from 'react'
import CardCategory from './CardCategory'
import textGeneral from '../text/textGeneral'

const CardCategoryGenerator = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10 py-10">
      {textGeneral.cardCategories.map((card, index) => (
        <CardCategory key={index} title={card.title} image={card.image} />
      ))}
    </div>
  )
}

export default CardCategoryGenerator
