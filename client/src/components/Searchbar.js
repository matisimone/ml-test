import React, { Component } from 'react';
import SearchForm from './SearchForm';

class Searchbar extends Component {
  render() {
    const { history } = this.props;

    return (
      <nav className="navbar navbar-expand-sm">
        <div className="container">
          <SearchForm history={history} />
        </div>
      </nav>
    );
  }
}

export default Searchbar;
