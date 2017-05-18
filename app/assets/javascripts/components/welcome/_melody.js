import React, { Component, PropTypes } from 'react'
import Movie from './_movie'

export default class Melody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMovie: false
    }
    this.handleToggleMovies = this.handleToggleMovies.bind(this)
  }

  handleToggleMovies() {
    if (this.state.showMovie) {
      this.setState({showMovie: false})
    } else {
      this.setState({showMovie: true})
    }
  }

  render () {
    return (
      <div className='melodyComponent'>
        <table className='table'>
          <tbody>
            <tr>
              <td rowSpan='2' className='music-thumbnail'>
                <span className='circle'>
                  <span className='glyphicon glyphicon-music' />
                </span>
              </td>
              <td>
                <span className='label label-info kind-label'>
                  {this.props.melody.kind.toUpperCase()}
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className='title'>
                  {this.props.melody.title}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <span className='link' onClick={this.handleToggleMovies}>
          {this.state.showMovie ? (
            <span className='glyphicon glyphicon-chevron-down' />
          ) : (
            <span className='glyphicon glyphicon-chevron-right' />
          )}
          <span className='show-movie-link'>{'視聴する'}</span>
        </span>
        {this.state.showMovie ? (
          <Movie advertisement_body={this.props.melody.advertisement_body} youtube={this.props.melody.youtube} />
        ) : (
          null
        )}
      </div>
    )
  }
}

Melody.propTypes = {
  melody: PropTypes.object.isRequired
}
