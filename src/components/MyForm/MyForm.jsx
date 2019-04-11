import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';



export default class MyForm extends React.Component {
  render() {
    return (
      <Form id="myForm">
        <FormGroup>
          <Label for="userName">Name</Label>
          <Input onChange={this.props.formChanged} type="text" value={this.props.name} name="name" id="userName" placeholder="enter your name" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Comment</Label>
          <Input onChange={this.props.formChanged} type="textarea" name="comment" value={this.props.comment} id="exampleText" placeholder="please leave a comment"/>
        </FormGroup>
        <Button onClick={this.props.formSubmit}>Submit</Button>
      </Form>
    );
  }
}