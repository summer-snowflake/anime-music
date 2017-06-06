import PropTypes from 'prop-types'
import React, { Component } from 'react'
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
              <td>
                <span className='label label-info kind-label'>
                  {this.props.melody.kind.toUpperCase()}
                </span>
              </td>
              <td className='melody-info' rowSpan='2'>
                <div dangerouslySetInnerHTML={{__html: this.props.melody.info}} />
              </td>
            </tr>
            <tr>
              <td className='title'>
                <span className='title'>
                  <span className='glyphicon glyphicon-music' />
                  <h2>{this.props.melody.title}</h2>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        {this.props.melody.youtube || this.props.melody.advertisement_body ? (
          <div>
            <span className='link' onClick={this.handleToggleMovies}>
              {this.state.showMovie ? (
                <span className='glyphicon glyphicon-chevron-down' />
              ) : (
                <span className='glyphicon glyphicon-chevron-right' />
              )}
              <span className='show-movie-link'>{'視聴する'}</span>
            </span>
            {this.state.showMovie ? (
              <Movie advertisement_body={this.props.melody.advertisement_body} comment={this.props.melody.comment} youtube={this.props.melody.youtube} />
            ) : (
              null
            )}
          </div>
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
