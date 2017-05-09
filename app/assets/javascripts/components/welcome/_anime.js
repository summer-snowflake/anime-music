import React, { Component, PropTypes } from 'react'
import Melody from './_melody'
import Movies from './_movies'

export default class Anime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMovies: false
    }
    this.handleToggleMovies = this.handleToggleMovies.bind(this)
  }

  handleToggleMovies() {
    if (this.state.showMovies) {
      this.setState({showMovies: false})
    } else {
      this.setState({showMovies: true})
    }
  }

  render () {
    return (
      <div className='animeComponent' id={'season-' + this.props.season.id}>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <h2 className='title'>
              { this.props.season.anime.title } {this.props.season.name} {'（第'}{ this.props.season.phase }{'期）'}
            </h2>
            <p className='summary'>
              { this.props.season.anime.summary }
            </p>
            {this.props.season.melodies.length > 0 ? (
              <hr />
            ) : (
              null
            )}
            {this.props.season.melodies.map((melody) =>
              <Melody key={melody.id} melody={melody} />
            )}
            <span className='link' onClick={this.handleToggleMovies}>
              {this.state.showMovies ? (
                <span className='glyphicon glyphicon-chevron-down' />
              ) : (
                <span className='glyphicon glyphicon-chevron-right' />
              )}
              <span className='show-movie-link'>{'視聴する'}</span>
            </span>
            {this.state.showMovies ? (
              <Movies movies={this.props.season.movies} />
            ) : (
              null
            )}
          </div>
        </div>
      </div>
    )
  }
}

Anime.propTypes = {
  season: PropTypes.object.isRequired
}
