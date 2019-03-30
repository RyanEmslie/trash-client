import React from 'react';

import MyForm from '../MyForm/MyForm';
import DataList from '../DataList/DataList';
import MyHeader from '../MyHeader/MyHeader';
import axios from 'axios';
// import axios from 'axios'

// Your parent component manages the state that is the props for all child components.
// This .setState on the parent component will update all of the props for child components.

// Also a child component can modify the parent component by calling the 
// Parent component function that was passed in as props.
// That function usually does this.setState and is called by people at my old company a toaster function.

export default class Layout extends React.Component {
  state = {
    formInfo: {
      name: '',
      comment: ''
    },
    dataList: {
      fetchArr: [],
      hasLoaded: false
    }
  };

  passUp = e => {
    console.log(e)
    this.setState({
      formInfo: {
        name: e.name,
        comment: e.comment
      }

    })
  };

  // DataList functions:

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
    console.log('reached')
        axios
          .post("https://trash-server-rte.herokuapp.com/api/testData", {
            name: this.state.formInfo.name,
            comment: this.state.formInfo.comment,
            })
        .then(console.log("Updated api successfully"))
        .catch(error => console.log("Update failed", {error}))
        this.clearState(
          this.state.formInfo.name,
          this.state.formInfo.comment
        )
       
    }
 
  clearState = (name, comment) => {
    console.log('This is clearForm', {name, comment})
    this.state.formInfo.name = name;
    this.state.formInfo.comment = comment;
    this.state.dataList.fetchArr = [ this.state.formInfo, ...this.state.dataList.fetchArr ]
    this.setState({
      formInfo: this.state.formInfo,
      dataList: this.state.dataList
    })

    this.clearForm()
  }
 
  clearForm = () => {
    document.querySelector('#userName').value = '';
    document.querySelector('#exampleText').value = '';
  }
  // deletes items from locations list
  deleteItem = e => {
    console.log('DELETE');
    console.log(e.target.getAttribute('id'));
    const delID = e.target.getAttribute('id');
    this.state.dataList.hasLoaded = false
    axios.delete(
      `https://trash-server-rte.herokuapp.com/api/testData/${delID}`
    );
    this.setState({
      dataList: this.state.dataList,
      /* hasLoaded: false */
    });
    this.fetchHeroku();
  };

  fetchHeroku = () => {
    console.log('GET');
    fetch('https://trash-server-rte.herokuapp.com/api/testData')
      .then(res => res.json())
      .then(res => {
        this.state.dataList.fetchArr = res
        this.state.dataList.hasLoaded = true
        this.setState({
          dataList: this.state.dataList,
          /* dataList: {fetchArr: res}, */
          /* dataList: {hasLoaded: true */
        });
      });
  };


  render() {
    const { name, comment } = this.state.formInfo;
    return (
      <>
        <MyHeader />
        <MyForm 
          name={name} comment={comment}
          formChanged={this.formChanged} formSubmit={this.formSubmit}
        />
        <DataList 
          propsTwo={this.state}
          formChanged={this.formChanged} formSubmit={this.formSubmit} 
          clearForm={this.clearForm} clearState={this.clearState}
          deleteItem={this.deleteItem} fetchHeroku={this.fetchHeroku}
        />
      </>
    );
  }
}
