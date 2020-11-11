import React, { useState } from 'react'
import Header from './components/Header'
import SearchForm from './components/SearchForm'
import SearchResults from './components/SearchResults'


const App = () => {
  const [searchParameters, setSearchParameters] = useState({
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
  })

  const handleInputChange = (e) => {
    let inputValue;
    if(e.target.type === 'checkbox') {
      if(e.target.checked === true) {
        inputValue = 'True'
      } else {
        inputValue = 'False'
      }
    } else {
      inputValue = e.target.value
    }

    setSearchParameters((prevState) => ({
      ...prevState,
      [e.target.name]: inputValue
    }));
  }

  return (
    <div className="App">
      <Header />
      <SearchForm
        searchParameters={searchParameters}
        handleInputChange={handleInputChange}
      />
      <SearchResults
        searchParameters={searchParameters}
      />
    </div>
  );
}

export default App;
