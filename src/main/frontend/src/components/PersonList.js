import React, { Component } from 'react';
import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';

export default class PersonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons : []
    };
  }

  componentDidMount() {
    this.getAllPeople();
  }

  getAllPeople() {
    axios.get("http://localhost:8080/api/v1/person")
    .then(response => response.data)
    .then((data) => {
      this.setState({persons : data});
    });
  };

  deletePerson = (personId) => {
    axios.delete("http://localhost:8080/api/v1/person/"+personId)
    .then(response => {
      if (response.data != null) {
        this.setState({"show":true});
        setTimeout(() => this.setState({"show":false}), 3000);
        this.setState({
          persons: this.state.persons.filter(person => person.id !== personId)
        });
      } else {
        this.setState({"show":false});
      }
    });
  };

  render () {
    return (
      <div>
        <div style={{"display":this.state.show ? "block" : "none"}}>
          <MyToast children = {{show:this.state.show, message:"Person Deleted Successfully.", type:"danger"}}/>
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faList} />{' '}Person List
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.persons.length === 0 ? 
                  <tr align="center">
                    <td colSpan="6"> Person Available.</td>
                  </tr> : 
                  this.state.persons.map((person) => (
                    <tr key={person.id}>
                      <td>{person.id}</td>
                      <td>{person.name}</td>
                      <td>
                        <ButtonGroup>
                          <Button size="sm" variant="outline-primary">
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>{' '}
                          <Button size="sm" variant="outline-danger" onClick={this.deletePerson.bind(this, person.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                } 
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}