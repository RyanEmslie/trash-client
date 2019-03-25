import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import axios from 'axios'
// import "bootstrap/dist/css/bootstrap.css";
// import './App.css'


export default class MyForm extends React.Component {
 
 state = {
   formInfo: {
   name: this.props.name,
   comment: this.props.comment
   }
 }

  formChanged = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formInfo: {
        ...prevState.formInfo,
        [name]: value
      }
    }));
  };

  formSubmit = e => {
        axios
          .post("https://trash-server-rte.herokuapp.com/api/testData", {
            name: this.state.formInfo.name,
            comment: this.state.formInfo.comment,
            })
          .then(console.log("Posted"));
        this.props.passUp(this.state.formInfo)
        this.clearState()
        
       
    }
 
  clearState = () => {
    console.log('This is clearForm')
    this.setState({
      formInfo:{
        name: '',
        comment: ''
      }
    })
    this.clearForm()
  }
 
  clearForm = () => {
    document.querySelector('#userName').value = '';
    document.querySelector('#exampleText').value = '';
     }

  render() {
    return (
      <Form id="myForm">
        <FormGroup>
          <Label for="userName">Name</Label>
          <Input onChange={this.formChanged} type="text" name="name" id="userName" placeholder="enter your name" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Comment</Label>
          <Input onChange={this.formChanged} type="textarea" name="comment" id="exampleText" placeholder="please leave a comment"/>
        </FormGroup>
        <Button onClick={this.formSubmit}>Submit</Button>
      </Form>
    );
  }
}