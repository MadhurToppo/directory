import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class NavigationBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Link to={""} className="navbar-brand">
          <img 
            src="/logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Link>
        <Nav className="mr-auto">
          <Link to={"add"} className="nav-link">Add Person</Link>
          <Link to={"list"} className="nav-link">Person List</Link>
          <Link to={"update"} className="nav-link">Update</Link>
        </Nav>
      </Navbar>
    );
  }
}