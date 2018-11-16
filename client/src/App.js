import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Main from './components/Main';
import { getParams } from './Utils';
import './App.scss';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route
          path="/"
          render={({ location, history }) => {
            const { q } = getParams(location);
            return <Main q={q} history={history} />;
          }}
        />
      </React.Fragment>
    );
  }
}

export default App;
