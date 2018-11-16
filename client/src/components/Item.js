import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Item extends Component {
  state = {
      item: {}
  };

  parseData = data => {
    if (data.price.currency === 'ARS') {
      data.price.currency = '$';
    }

    if (data.free_shipping) {
        data.free_shipping = <i className="shipping-icon" />;
      }

    return data;
  };

  render() {
      const { item } = this.props;
      this.parseData(item);

    return (
      <Link to={`/items/${item.id}`}>
        <div className="item d-flex">
          <img
            src={item.picture}
            alt="itemImg"
            className="item-img"
          />
          <div className="item-info">
            <div className="item-price">
              {item.price.currency} {item.price.amount} {item.free_shipping}
            </div>
            <div className="item-name">{item.title}</div>
          </div>
          <div className="item-location ml-auto">{item.location}</div>
        </div>
        <hr />
      </Link>
    );
  }
}

export default Item;
