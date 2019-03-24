import React from 'react';

import MyForm from '../MyForm/MyForm';
import DataList from '../DataList/DataList';
import MyHeader from '../MyHeader/MyHeader';

// import axios from 'axios'

export default class Example extends React.Component {
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

  render() {
    const { name, comment } = this.state.formInfo;
    return (
      <>
        <MyHeader />
        <MyForm passUp={this.passUp} name={name} comment={comment}/>
        <DataList />
      </>
    );
  }
}
