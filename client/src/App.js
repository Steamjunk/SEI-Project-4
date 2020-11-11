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
    console.log(e.target)
    if(e.target.type === 'checkbox' &&
       e.target.checked === true) {
      console.log('check')
      setSearchParameters((prevState) => ({
        ...prevState,
        [e.target.name]: 'True'
      }));
    } else 
    if(e.target.type === 'checkbox' &&
       e.target.checked === false) {
      console.log('uncheck')
      setSearchParameters((prevState) => ({
        ...prevState,
        [e.target.name]: 'False'
      }));
    } else {
      setSearchParameters((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
      }));
    }
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
