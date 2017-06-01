import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class AdminActorsPage extends Component {
  render() {
    return (
      <div className='adminActorsPageComponent'>
        {this.props.children}
      </div>
    )
  }
}

AdminActorsPage.propTypes = {
  children: PropTypes.any.isRequired
}
