import React from 'react';

import MyForm from '../MyForm/MyForm';
import DataList from '../DataList/DataList';
import MyHeader from '../MyHeader/MyHeader';
import axios from 'axios';

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

  // DataList functions:

  //Updates the State as user types in text field of form
  formChanged = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formInfo: {
        ...prevState.formInfo,
        [name]: value
      }
    }));
  };

  // onclick event from the submit button of the form
  formSubmit = async e => {
    try {
      const result = await axios.post(
        'https://trash-server-rte.herokuapp.com/api/testData',
        {
          name: this.state.formInfo.name,
          comment: this.state.formInfo.comment
        }
      );
      await this.setState(state => {
        const newFetchArr = [result.data, ...state.dataList.fetchArr];
        return {
          formInfo: {
            name: '',
            comment: ''
          },
          dataList: {
            fetchArr: newFetchArr,
            hasLoaded: true
          }
        };
      });
    } catch (error) {
      console.log('Update failed', { error });
    }
  };


  deleteItem = async e => {
    try {
      const delID = e.target.getAttribute('id');
      const deleteResult = await axios.delete(`https://trash-server-rte.herokuapp.com/api/testData/${delID}`)
      await this.setState(state => {
        const newFetchArr = [deleteResult.data, ...state.dataList.fetchArr];
        return {
          dataList: {
            fetchArr: newFetchArr,
            hasLoaded: true
          }
        };
      });
      this.fetchHeroku();
    } catch (error) {
      console.log('Delete failed', { error });
    }
  };



  fetchHeroku = () => {
    console.log('GET');
    fetch('https://trash-server-rte.herokuapp.com/api/testData')
      .then(res => res.json())
      .then(res => {
        this.setState({
          dataList: { fetchArr: res, hasLoaded: true }
        });
      });
  };

  render() {
    const { name, comment } = this.state.formInfo;
    return (
      <>
        <MyHeader />
        <MyForm
          name={name}
          comment={comment}
          formChanged={this.formChanged}
          formSubmit={this.formSubmit}
        />
        <DataList
          propsTwo={this.state}
          formChanged={this.formChanged}
          formSubmit={this.formSubmit}
          clearForm={this.clearForm}
          deleteItem={this.deleteItem}
          fetchHeroku={this.fetchHeroku}
        />
      </>
    );
  }
}
