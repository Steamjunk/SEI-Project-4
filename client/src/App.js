import React, { Component } from 'react'
import Header from './components/Header'
import SearchForm from './components/SearchForm'
import SearchResults from './components/SearchResults'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import { registerUser, loginUser, verifyUser } from './services/api_helper'



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
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
    }
  }

  handleRegister = async (e, registerData) => {
    e.preventDefault();
    const currentUser = await registerUser(registerData);
    this.setState({ currentUser })
  }
  
  handleLogin = async (e, loginData) => {
    e.preventDefault();
    const currentUser = await loginUser(loginData);
    this.setState({ currentUser })
  }

  handleVerify = async () => {
    console.log('here!')
    const currentUser = await verifyUser();
    console.log(currentUser)
    if (currentUser) {
      this.setState({ currentUser });
    }
  }

  handleInputChange = (e) => {
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
    // fix set search parameters
    // setSearchParameters((prevState) => ({
    //   ...prevState,
    //   [e.target.name]: inputValue
    // }));
  }

  // componentDidMount() {
  //   this.handleVerify();
  // }

  render() {
    return (
      <div className="App">
        <Header />
        {/* {this.state.currentUser ? 
          <h1>Hello, {this.state.currentUser.username}</h1> 
        : 
          <h1>Hello World</h1>}
        <RegisterForm handleRegister={this.handleRegister} />
        <LoginForm handleLogin={this.handleLogin} /> */}
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
