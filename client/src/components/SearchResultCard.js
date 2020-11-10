import React, { useState } from 'react'


const SearchResultCard = (props) => {
    const [cardData] = useState(props.card)

    return (
        <div>
            <img src={cardData.imageUrl} alt={`${cardData.name} card art`} />
            <h3>{cardData.name}</h3>
            <h4>
                {cardData.Supertypes && cardData.Supertypes.map((supertype, index) => {
                    return <span key={index}>{supertype.supertype} </span>
                })}
                {cardData.Types && cardData.Types.map((type, index) => {
                    return <span key={index}>{type.type} - </span>
                })}
                {cardData.Subtypes && cardData.Subtypes.map((subtype, index) => {
                    return <span key={index}>{subtype.subtype} </span>
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