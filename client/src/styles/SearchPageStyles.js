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
    // justify-content: center;
    align-items: center;
`

export const SearchResults =Styled.div`
    background: lemonchiffon;
    width: 95%;
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
`