import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import "bootstrap/dist/css/bootstrap.css";
// import './App.css'


export default class MyForm extends React.Component {
 
constructor(props){
  super(props);
}

  render() {
    return (
      <Form id="myForm">
        <FormGroup>
          <Label for="userName">Name</Label>
          <Input onChange={this.props.formChanged} type="text" name="name" id="userName" placeholder="enter your name" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Comment</Label>
          <Input onChange={this.props.formChanged} type="textarea" name="comment" id="exampleText" placeholder="please leave a comment"/>
        </FormGroup>
        <Button onClick={this.props.formSubmit}>Submit</Button>
      </Form>
    );
  }
}