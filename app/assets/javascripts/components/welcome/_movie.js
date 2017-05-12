import React, { Component, PropTypes } from 'react'

export default class Movie extends Component {
  render () {
    return (
      <div className='movieComponent' id={'movie-' + this.props.movie.melody_id}>
        <span dangerouslySetInnerHTML={{__html: this.props.movie.youtube}} />
        <div className='cd pull-right'>
          <span className='label label-default'>{'CD'}</span>
          <span dangerouslySetInnerHTML={{__html: this.props.movie.advertisement_body}} />
        </div>
      </div>
    )
  }
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired
}
