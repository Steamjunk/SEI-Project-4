import React, { Component } from 'react';


class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:9000/cards")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <div>
                <p>
                    {this.state.apiResponse ? this.state.apiResponse : "waiting for API..."}
                </p>
            </div>
        )
    }
}

export default SearchResults