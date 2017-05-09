import React, { Component, PropTypes } from 'react'

export default class Movie extends Component {
  render () {
    return (
      <div className='movieComponent' id={'movie-' + this.props.movie.melody_id}>
        <span dangerouslySetInnerHTML={{__html: this.props.movie.youtube}} />
      </div>
    )
  }
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired
}
