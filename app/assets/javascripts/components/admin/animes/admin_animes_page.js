import React, { Component, PropTypes } from 'react'

export default class AdminAnimesPage extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

AdminAnimesPage.propTypes = {
  children: PropTypes.any.isRequired
}
