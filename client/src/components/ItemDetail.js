import React, { Component } from 'react';
import Breadcrum from './Breadcrum';
import axios from 'axios';

class ItemDetail extends Component {
  state = {
    loading: false,
    response: {}
  };

  parseData = data => {
    if (data.item.condition === 'new') {
      data.item.condition = 'Nuevo';
    }

    if (data.item.price.currency === 'ARS') {
      data.item.price.currency = '$';
    }

    return data;
  };

  getItem = id => {
    if (!id) {
      return this.setState({
        response: {}
      });
    }

    this.setState({ loading: true });

    return axios
      .get(`/api/items/${id}`)
      .then(response => {
        console.log(response.data);
        const parsedData = this.parseData(response.data.data);
        this.setState({ loading: false });
        this.setState({ response: parsedData });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    return this.getItem(this.props.location.pathname.split('/')[2]);
  }

  render() {
    const { loading, response } = this.state;
    
    if (loading) {
      return <div className="loading"></div>;
    }

    if (
      Object.keys(response).length !== 0 
    ) {
      return (
        <React.Fragment>
          <Breadcrum />
          <div className="item-detail">
            <div className="d-flex">
              <img
                src={response.item.picture}
                alt="itemImg"
                className="item-d-img"
              />
              <div className="item-d-info">
                <div className="item-d-state">
                  {response.item.condition} - {response.item.sold_quantity}{' '}
                  vendidos
                </div>
                <div className="item-d-name">{response.item.title}</div>
                <div className="item-d-price">
                  {response.item.price.currency} {response.item.price.amount}
                </div>
                <a href={response.item.permalink} target="_blank" rel="noopener noreferrer">
                  <button
                    type="button"
                    className="btn btn-primary item-d-button"
                  >
                    Comprar
                  </button>
                </a>
              </div>
            </div>
            <div className="item-d-description-div">
              <div className="item-d-description-title">Descripción del producto</div>
              <div className="item-d-description">
                {response.item.description}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return <React.Fragment />;
    }
  }
}

export default ItemDetail;
