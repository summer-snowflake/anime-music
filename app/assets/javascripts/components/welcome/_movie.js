import React, { Component, PropTypes } from 'react'

export default class Movie extends Component {
  render () {
    return (
      <div className='movieComponent'>
        <span className='pull-left' dangerouslySetInnerHTML={{__html: this.props.youtube}} />
        {this.props.advertisement_body ? (
          <span className='cd pull-left'>
            <span className='label label-default'>{'CD'}</span>
            <span dangerouslySetInnerHTML={{__html: this.props.advertisement_body}} />
          </span>
        ) : (
          null
        )}
      </div>
    )
  }
}

Movie.propTypes = {
  youtube: PropTypes.string,
  advertisement_body: PropTypes.string
}
