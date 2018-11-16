import React, { Component } from 'react';

class Breadcrum extends Component {
  state = {
    loading: false,
    categories: []
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.setState({ categories: this.props.categories });
  }

  render() {
    const { loading, categories } = this.state;
    if (loading && categories && categories.length) {
      return (
        <div className="breadcrum">
          {categories.map((item, index, arr) => {
            if (arr.length - 1 !== index) {
              item = `${item} > `;
              return <span key={index}>{item}</span>;
            } else {
              return (
                <strong key={index}>
                  <span >{item}</span>
                </strong>
              );
            }
          })}
        </div>
      );
    } else {
      return <React.Fragment />;
    }
  }
}

export default Breadcrum;
