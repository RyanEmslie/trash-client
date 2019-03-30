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

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchHeroku();
  }

  render() {
    if (this.props.propsTwo.dataList.hasLoaded) {
      const { fetchArr } = this.props.propsTwo.dataList;

      //!
      //!Where would I put the key for the map function
      //!
      const finalArr = fetchArr.map((data, index) => {
        console.log({fetchArr, props: this.props})
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
                      id={index}
                      className="remove-btn location-lists"
                      onClick={this.props.deleteItem}>
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
