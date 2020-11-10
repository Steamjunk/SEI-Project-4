import React, { useState, useEffect } from 'react';


const SearchResults = (props) => {
    const [apiResponse, setApiResponse] = useState(null)

    



    const callAPI = () => {
        const searchUrl = buildUrl()
        console.log(searchUrl)
        fetch(searchUrl)
            .then(res => res.text())
            .then(res => setApiResponse(res));
    }

    const buildUrl = () => {
        console.log(props.searchParameters)
        let searchUrl = 'http://localhost:9000/cards/'

        if (props.searchParameters.name) {
            searchUrl = searchUrl + `${props.searchParameters.name}/`
        } else {
            searchUrl = searchUrl + `null/`
        }
        if (props.searchParameters.set) {
            searchUrl = searchUrl + `${props.searchParameters.set}/`
        } else {
            searchUrl = searchUrl + `null/`
        }
        if (props.searchParameters.white) {
            searchUrl = searchUrl + `${props.searchParameters.white}/`
        } else {
            searchUrl = searchUrl + `null/`
        }
        if (props.searchParameters.blue) {
            searchUrl = searchUrl + `${props.searchParameters.blue}/`
        } else {
            searchUrl = searchUrl + `null/`
        }
        if (props.searchParameters.black) {
            searchUrl = searchUrl + `${props.searchParameters.black}/`
        } else {
            searchUrl = searchUrl + `null/`
        }
        if (props.searchParameters.green) {
            searchUrl = searchUrl + `${props.searchParameters.green}/`
        } else {
            searchUrl = searchUrl + `null/`
        }
        if (props.searchParameters.red) {
            searchUrl = searchUrl + `${props.searchParameters.red}/`
        } else {
            searchUrl = searchUrl + `null/`
        }
        if (props.searchParameters.colorless) {
            searchUrl = searchUrl + `${props.searchParameters.colorless}/`
        } else {
            searchUrl = searchUrl + `null/`
        }
        if (props.searchParameters.supertype) {
            searchUrl = searchUrl + `${props.searchParameters.supertype}/`
        } else {
            searchUrl = searchUrl + `null/`
        }
        if (props.searchParameters.type) {
            searchUrl = searchUrl + `${props.searchParameters.type}/`
        } else {
            searchUrl = searchUrl + `null/`
        }
        if (props.searchParameters.subtype) {
            searchUrl = searchUrl + `${props.searchParameters.subtype}/`
        } else {
            searchUrl = searchUrl + `null/`
        }


        return searchUrl
    }

    useEffect(() => {
        console.log(props)
        callAPI();
    }, [props.searchParameters]);


    return (
        <div>
            <h2>Search Results</h2>
            <p>Found {} cards</p>
            <p>
                {apiResponse ? apiResponse : "waiting for API..."}
            </p>
        </div>
    )
}

export default SearchResults