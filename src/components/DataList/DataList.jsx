import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button,
  Container,
  Row,
  Col
} from 'reactstrap';
import axios from 'axios';

export default class DataList extends Component {
  state = {
    fetchArr: [],
    hasLoaded: false
  };

  componentDidMount() {
    this.fetchHeroku();
  }

  // deletes items from locations list
  deleteItem = e => {
    console.log('DELETE');
    console.log(e.target.getAttribute('id'));
    const delID = e.target.getAttribute('id');
    axios.delete(
      `https://trash-server-rte.herokuapp.com/api/testData/${delID}`
    );
    this.setState({
      hasLoaded: false
    });
    this.fetchHeroku();
  };

  fetchHeroku = () => {
    console.log('GET');
    fetch('https://trash-server-rte.herokuapp.com/api/testData')
      .then(res => res.json())
      .then(res => {
        this.setState({
          fetchArr: res,
          hasLoaded: true
        });
      });
  };

  render() {
    if (this.state.hasLoaded) {
      const { fetchArr } = this.state;

      //!
      //!Where would I put the key for the map function
      //!
      const finalArr = fetchArr.map(data => {
        return (
         
           
              <Col xs="6" sm="4">
                <ListGroup id="myListGroup">
                  <ListGroupItem>
                    <ListGroupItemHeading>{data.name}</ListGroupItemHeading>
                    <ListGroupItemText>{data.comment}</ListGroupItemText>
                    <ListGroupItemText>{data.date}</ListGroupItemText>
                    <Button
                      type="submit"
                      color="danger"
                      // key={markerItem.date}
                      id={data._id}
                      className="remove-btn location-lists"
                      onClick={this.deleteItem}>
                      Delete
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            
         
        );
      });
      return <div> <Container><Row>{finalArr} </Row></Container></div>;
    } else {
      return null;
    }
  }
}
