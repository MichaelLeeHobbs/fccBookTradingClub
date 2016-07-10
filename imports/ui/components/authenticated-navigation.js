import React from 'react';
import { browserHistory } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

export const AuthenticatedNavigation = () => (
  <div>
    <Nav>
      <IndexLinkContainer to="/">
        <NavItem eventKey={ 1 } href="/">Home</NavItem>
      </IndexLinkContainer>
      <LinkContainer to="/books">
        <NavItem eventKey={ 2 } href="/books">Books</NavItem>
      </LinkContainer>
      <LinkContainer to={`/books/${Meteor.userId()}`}>
        <NavItem eventKey={ 3 } href={ `/books/${Meteor.userId()}` } >My Books</NavItem>
      </LinkContainer>
      <LinkContainer to={`/addbook`}>
        <NavItem eventKey={ 3 } href={ `/addbook` } >Add Book</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={ 4 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 4.1 } onClick={ handleLogout }>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);
