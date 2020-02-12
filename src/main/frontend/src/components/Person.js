import React, { Component } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo} from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import axios from 'axios';

export default class Person extends Component{
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    this.personChange = this.personChange.bind(this);
    this.submitPerson = this.submitPerson.bind(this);
  }

  initialState = {
    name:''
  }

  resetPerson = () => {
    this.setState(() => this.initialState)
  }

  submitPerson = event => {
    event.preventDefault();

    const person = {
      name: this.state.name
    };

    axios.post("http://localhost:8080/api/v1/person", person)
      .then(response => {
        if (response.data != null) {
          this.setState({"show":true});
          setTimeout(() => this.setState({"show":false}), 3000);
        } else {
          this.setState({"show":false});
        }
    });

    this.setState(this.initialState);
  }

  personChange = event => {
    this.setState({
      [event.target.name]:event.target.value
    });
  }

  render () {
    const {name} = this.state;

    return (
      <div>
        <div style={{"display":this.state.show ? "block" : "none"}}>
          <MyToast children = {{show:this.state.show, message:"Person Added Successfully.", type:"success"}}/>
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header>
          <FontAwesomeIcon icon={faPlusSquare} />{' '}Add Person
        </Card.Header>
        <Form onReset={this.resetPerson} onSubmit={this.submitPerson} id="bookFormId">
          <Card.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control required autoComplete="off"
                  type="test" 
                  name="name"
                  value={name}
                  onChange={this.personChange}
                  className="bg-dark text-white"
                  placeholder="Enter name">
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Card.Body>
          <Card.Footer style={{"textAlign":"right"}}>
            <Button size="sm" variant="success" type="submit">
              <FontAwesomeIcon icon={faSave} />{' '}Submit
            </Button>{' '}
            <Button size="sm" variant="info" type="reset">
              <FontAwesomeIcon icon={faUndo} />{' '}Reset
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </div>      
    );
  }
}