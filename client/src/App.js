import React, { Component } from 'react'
import Header from './components/Header'
import SearchForm from './components/SearchForm'
import SearchResults from './components/SearchResults'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParameters: {
        name: '',
        set: '',
        white: 'False',
        blue: 'False',
        black: 'False',
        green: 'False',
        red: 'False',
        colorless: 'False',
        supertype: '',
        type: '',
        subtype: ''
      }
    };
  }

  handleInputChange = (e) => {
    this.state.searchParameters[e.target.name] = e.target.value
  }

  render() {
    return (
      <div className="App">
        <Header />
        <SearchForm
          searchParameters={this.state.searchParameters}
          handleInputChange={this.handleInputChange}
        />
        <SearchResults
          searchParameters={this.state.searchParameters}
        />
      </div>
    );
  }
}

export default App;
