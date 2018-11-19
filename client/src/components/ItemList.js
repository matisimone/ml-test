import React, { Component } from 'react';
import Breadcrum from './Breadcrum';
import Item from './Item';
import { getItemsByQuery } from '../api/Item';

class ItemList extends Component {
  state = {
    loading: false,
    query: '',
    response: {}
  };

  getItems = query => {
    if (!query) {
      return this.setState({
        response: {}
      });
    }

    this.setState({ loading: true });

    getItemsByQuery(query)
      .then(response => {
        this.setState({ loading: false, response: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    return this.getItems(this.props.q);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.q !== this.props.q) {
      this.setState({ q: nextProps.q });
      return this.getItems(nextProps.q);
    }
  }

  render() {
    const { loading, response } = this.state;

    if (loading) {
      return <div className="loading"></div>;
    }
    if (
      Object.keys(response).length !== 0 && response.items && 
      response.items.length
    ) {
      return (
        <React.Fragment>
          <Breadcrum categories={response.categories} />
          {response.items.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </React.Fragment>
      );
    } else {
        return <React.Fragment></React.Fragment>;
    }
  }
}

export default ItemList;
