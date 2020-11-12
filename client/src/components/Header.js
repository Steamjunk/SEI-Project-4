import React from 'react';

import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header className="App-header">
            <Link to='/'>
                <h1>The Command Tower</h1>
            </Link>
            {props.currentUser ?
                <nav>
                    <li>
                        <Link to='/'>Find Cards</Link>
                    </li>
                    <li>
                        <Link to='/decks'>My Decks</Link>
                    </li>
                    <li>
                        <Link to='/account'>{props.currentUser.username}'s' Account</Link>
                    </li>
                    <li>
                        <Link to='/'><button onClick={props.handleLogout}>Logout</button></Link>
                    </li>
                </nav>
                :
                <nav>
                    <li>
                        <Link to='/login' >Login</Link>
                    </li>
                    <li>
                        <Link to='/register' >Register</Link>
                    </li>
                </nav>
            }
        </header>
    )
}

export default Header