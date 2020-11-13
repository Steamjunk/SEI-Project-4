import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import * as S from '../styles/SearchPageStyles';
import { Bold } from '../styles/GlobalStyle';


const SearchResultCard = (props) => {
    const [cardData] = useState(props.card)

    return (
        <S.ResultCard>
            <Link to={`/card/${cardData.id}`}>
                <S.ResultCardArt src={cardData.imageUrl} alt={`${cardData.name} card art`} />
            </Link>
            <S.CardInfo>
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
                <p><Bold>Power:</Bold> {cardData.power}</p>
                <p><Bold>Toughness:</Bold> {cardData.toughness}</p>
                <p><Bold>Rarity:</Bold> {cardData.rarity}</p>
                <p><Bold>Set:</Bold> {cardData.setName}</p>
            </S.CardInfo>
        </S.ResultCard>
    )
}

export default SearchResultCard