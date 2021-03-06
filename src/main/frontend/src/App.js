import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Person from './components/Person';
import PersonList from './components/PersonList';
import Update from './components/Update';

export default function App() {
  const marginTop = {
    marginTop:"20px"
  };

  return (
    <Router>
      <NavigationBar/>
      <Container>
        <Row>
          <Col lg={12} style={marginTop}>
            <Switch>
              <Route path="/" exact component={Welcome}/>
              <Route path="/add" exact component={Person}/>
              <Route path="/list" exact component={PersonList}/>
              <Route path="/update" exact component={Update}/>
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </Router>
  );
}