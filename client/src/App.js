import React, { Component } from 'react'

class App extends Component {
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
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
        <p className="App-intro">
          {this.state.apiResponse ? `API data: ${this.state.apiResponse}` : "waiting for API..."}
          </p>

      </div>
    );
  }
}

export default App;
