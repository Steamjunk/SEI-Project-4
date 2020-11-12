import React, { Component } from 'react'
import Header from './components/Header'
import SearchPage from './components/SearchPage'
import AccountPage from './components/AccountPage'
import DeckPage from './components/DeckPage'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import { registerUser, loginUser, verifyUser } from './services/api_helper'
import { Redirect, Route } from 'react-router';




class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
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

  handleLogout = () => {
    localStorage.removeItem('authToken');
    this.setState({ currentUser: null });
  }

  componentDidMount() {
    this.handleVerify();
  }

  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} handleLogout={this.handleLogout} />
        {this.state.currentUser ?
          <h1>Hello, {this.state.currentUser.username}</h1>
          :
          <h1>Hello World</h1>}
        <Route exact path="/" component={SearchPage} />
        <Route path="/account" component={AccountPage} />
        <Route path="/decks" component={DeckPage} />
        <Route path="/login">
          <LoginForm handleLogin={this.handleLogin} />
        </Route>
        <Route path="/register">
          <RegisterForm handleRegister={this.handleRegister} />
        </Route>
      </div>
    );
  }
}

export default App;
