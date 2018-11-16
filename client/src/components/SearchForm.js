import React, { Component } from 'react';
import { setParams } from '../Utils';

class SearchForm extends Component {
  state = {
    submitted: false,
    inputValue: ''
  };

  onChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  onSearchSubmit = e => {
    e.preventDefault();
    const url = setParams({ q: this.state.inputValue });
    this.props.history.push(`/items?${url}`);
  };

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  render() {
    const { inputValue } = this.state;

    return (
      <React.Fragment>
        <a className="logo" href="/" />
        <div className="collapse navbar-collapse">
          <input
            type="text"
            placeholder="Nunca dejes de buscar"
            className="search-input"
            value={inputValue}
            onChange={this.onChange}
            ref={node => {
              this.input = node;
            }}
          />
          <button
            type="button"
            className="search-button"
            onClick={this.onSearchSubmit}
          >
            <i className="search-icon" />
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchForm;
