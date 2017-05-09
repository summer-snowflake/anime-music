import React, { Component, PropTypes } from 'react'
import Movie from './_movie'

export default class Movies extends Component {
  render () {
    return (
      <div className='moviesComponent'>
        {this.props.movies.map((movie) =>
          <Movie key={movie.melody_id} movie={movie} />
        )}
      </div>
    )
  }
}

Movies.propTypes = {
  movies: PropTypes.array.isRequired
}
