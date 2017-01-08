import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../origin.js'

export default class AdminAnimeThumbnail extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className='adminAnimeThumbnailComponent'>
        <div className='col-xs-6 col-md-3'>
          <a href='#' className='thumbnail'>
            <img src={this.props.picture} alt={this.props.title} />
          </a>
        </div>
      </div>
    )
  }
}

AdminAnimeThumbnail.propTypes = {
  id: PropTypes.number.isRequired
}
