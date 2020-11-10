import React, { useState } from 'react'


const SearchResultCard = (props) => {
    const [cardData] = useState(props.card)
    console.log(cardData)

    return (
        <div>
            <img src={cardData.imageUrl} />
            <h3>{cardData.name}</h3>
            <h4>
                {cardData.Supertypes && cardData.Supertypes.map((supertype) => {
                    return <span>{supertype.supertype} </span>
                })}
                {cardData.Types && cardData.Types.map((type) => {
                    return <span>{type.type} - </span>
                })}
                {cardData.Subtypes && cardData.Subtypes.map((subtype) => {
                    return <span>{subtype.subtype} </span>
                })}
            </h4>
            <p>{cardData.text}</p>
            <p>{cardData.flavor}</p>
            <p>Power: {cardData.power}</p>
            <p>Toughness: {cardData.toughness}</p>
            <p>Rarity: {cardData.rarity}</p>
            <p>Set: {cardData.setName}</p>
        </div>
    )
}

export default SearchResultCard