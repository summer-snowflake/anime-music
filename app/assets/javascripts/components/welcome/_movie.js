import React, { Component, PropTypes } from 'react'

export default class Movie extends Component {
  render () {
    return (
      <div className='movieComponent' id={'movie-' + this.props.movie.melody_id}>
        <span className='pull-left' dangerouslySetInnerHTML={{__html: this.props.movie.youtube}} />
        {this.props.movie.advertisement_body ? (
          <span className='cd pull-left'>
            <span className='label label-default'>{'CD'}</span>
            <span dangerouslySetInnerHTML={{__html: this.props.movie.advertisement_body}} />
          </span>
        ) : (
          null
        )}
      </div>
    )
  }
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired
}
