import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Searchbar from './Searchbar';
import ItemList from './ItemList';
import ItemDetail from './ItemDetail';
import { getParams } from '../Utils';

class Main extends Component {
  render() {
    const { history } = this.props;

    return (
      <React.Fragment>
        <Searchbar history={history} />
        <div className="container">
          <Route
            path="/items"
            render={({ location, history }) => {
              const { q } = getParams(location);
              return <ItemList q={q} history={history} />;
            }}
          />
          <Route exact path="/items/:id" component={ItemDetail} />
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
