import React, {Component} from 'react';
import { connect } from 'react-redux';
import App from './index';
import { ConnectedRouter } from 'react-router-redux';
import { history } from './../../stores';

class ConnectedApp extends Component {
  render() {
    return <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  }
}

const mapDispatchToProps = {};

export default connect(
  null,
  mapDispatchToProps
)(ConnectedApp);