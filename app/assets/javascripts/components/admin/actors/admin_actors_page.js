import React, { Component, PropTypes } from 'react'

export default class AdminActorsPage extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

AdminActorsPage.propTypes = {
  children: PropTypes.any.isRequired
}
