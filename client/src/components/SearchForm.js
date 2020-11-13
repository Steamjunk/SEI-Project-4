import React from 'react';

import * as S from '../styles/SearchPageStyles';


const SearchForm = (props) => {
    return (
        <S.SearchForm onSubmit={(e) => {e.preventDefault();}}>
            <S.SearchFormContainer>
                <h2>Find Cards</h2>
                <input
                    type='text'
                    name='name'
                    placeholder='Card Name'
                    onChange={props.handleInputChange}
                />
                <select
                    name='set'
                    onChange={props.handleInputChange}
                    defaultValue='Set'
                >
                    <option disabled hidden>Set</option>
                    <option>Any</option>                
                    {/* get set names */}
                </select>
            </S.SearchFormContainer>
            <S.SearchFormContainer>
                <h3>Color Identity</h3>
                <S.ColorContainer>
                    <input 
                        type="checkbox"
                        id="white"
                        name="white"
                        value="True"
                        onChange={props.handleInputChange}
                    />
                    <label htmlFor="white">White</label>
                </S.ColorContainer>
                <S.ColorContainer>
                    <input
                        type="checkbox"
                        id="blue"
                        name="blue"
                        value="True"
                        onChange={props.handleInputChange}
                    />
                    <label htmlFor="blue">Blue</label>
                </S.ColorContainer>
                <S.ColorContainer>
                    <input
                        type="checkbox"
                        id="black"
                        name="black"
                        value="True"
                        onChange={props.handleInputChange}
                    />
                    <label htmlFor="black">Black</label>
                </S.ColorContainer>
                <S.ColorContainer>
                    <input
                        type="checkbox"
                        id="red"
                        name="red"
                        value="True"
                        onChange={props.handleInputChange}
                    />
                    <label htmlFor="red">Red</label>
                </S.ColorContainer>
                <S.ColorContainer>
                    <input
                        type="checkbox"
                        id="green"
                        name="green"
                        value="True"
                        onChange={props.handleInputChange}
                    />
                    <label htmlFor="green">Green</label>
                </S.ColorContainer>
                <S.ColorContainer>
                    <input
                        type="checkbox"
                        id="colorless"
                        name="colorless"
                        value="True"
                        onChange={props.handleInputChange}
                    />
                    <label htmlFor="colorless">Colorless</label>
                </S.ColorContainer>
            </S.SearchFormContainer>
            <S.SearchFormContainer>
                <h3>Card Type</h3>
                <select
                    name='supertype'
                    onChange={props.handleInputChange}
                    defaultValue='Supertype'
                >
                    <option disabled hidden>Supertype</option>
                    <option>Any</option>                
                    {/* get supertype names */}
                </select>
                <select
                    name='type'
                    onChange={props.handleInputChange}
                    defaultValue='Type'
                >
                    <option disabled hidden>Type</option>
                    <option>Any</option>                
                    {/* get Type names */}
                </select>
                <select
                    name='subtype'
                    onChange={props.handleInputChange}
                    defaultValue='Subtype'
                >
                    <option disabled hidden>Subtype</option>
                    <option>Any</option>                
                    {/* get Subtype names */}
                </select>
            </S.SearchFormContainer>
        </S.SearchForm>
    )
}

export default SearchForm
