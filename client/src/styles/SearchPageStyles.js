import Styled from "styled-components";

export const SearchPage = Styled.header`
   display: flex;
   flex-flow: column nowrap;
`

export const SearchForm = Styled.form`
    background: green;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin: 0 auto;
    padding: 10px;
    width: 60vw;
`

export const SearchFormContainer = Styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 30%;
    align-items: center;
    padding: 10px;
`

export const ColorContainer = Styled.div`
    width: 50%;
`

export const SearchResults =Styled.div`
    background: lemonchiffon;
    width: 100%;
    margin: 0 auto;
`

export const SearchHeader = Styled.h2`
    margin: 0;
    text-align: center;
`
    
export const ResultInfo = Styled.p`
    text-align: center;
`

export const ResultsList = Styled.ul`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    padding-inline-start: 0px;
`

export const ResultCard = Styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    width: 30%;
    background: lightblue;
    padding: 10px;
    margin: 5px;
`

export const ResultCardArt = Styled.img`
    width: 250px;
    height: 350px;
    &:hover {
        background-color: #fdc788;
    }
`


export const CardInfo = Styled.div`
    padding: 10px;
    width: 60%;
`