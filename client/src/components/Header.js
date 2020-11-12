import React from 'react';

import { Link } from 'react-router-dom';
import * as H from "../styles/HeaderStyle";

const Header = (props) => {
    return (
        <H.StyledHeader>
            <Link to='/'>
                <h1>The Command Tower</h1>
            </Link>
            {props.currentUser ?
                <H.StyledNav>
                    <H.StyledNavLink>
                        <Link to='/'>Find Cards</Link>
                    </H.StyledNavLink>
                    <H.StyledNavLink>
                        <Link to='/decks'>My Decks</Link>
                    </H.StyledNavLink>
                    <H.StyledNavLink>
                        <Link to='/account'>{props.currentUser.username}'s' Account</Link>
                    </H.StyledNavLink>
                    <H.StyledNavLink>
                        <Link to='/'><button onClick={props.handleLogout}>Logout</button></Link>
                    </H.StyledNavLink>
                </H.StyledNav>
                :
                <H.StyledNav>
                    <H.StyledNavLink>
                        <Link to='/login' >Login</Link>
                    </H.StyledNavLink>
                    <H.StyledNavLink>
                        <Link to='/register' >Register</Link>
                    </H.StyledNavLink>
                </H.StyledNav>
            }
        </H.StyledHeader>
    )
}

export default Header