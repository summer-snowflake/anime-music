import PropTypes from 'prop-types'
import React, { Component } from 'react'

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
    const comment = { __html: this.props.melody.comment.replace(/\r?\n/g, '<br>') }
    return (
      <tbody className='melodyComponent'>
        <tr>
          <td className='advertisement'>
            {this.props.melody.advertisement_body ? (
              <span dangerouslySetInnerHTML={{__html: this.props.melody.advertisement_body}} />
            ) : (
              <span className='circle'>
                <span className='glyphicon glyphicon-music' />
              </span>
            )}
          </td>
          <td className='title'>
            <span className='label label-info kind-label'>
              {this.props.melody.kind.toUpperCase()}
            </span>
            <h2>
              <span className='glyphicon glyphicon-music' />
              {this.props.melody.title}
            </h2>
          </td>
          <td className='melody-info'>
            <div dangerouslySetInnerHTML={{__html: this.props.melody.info}} />
          </td>
        </tr>
        {this.props.melody.youtube || this.props.melody.advertisement_body ? (
          <tr>
            <td colSpan='3'>
              {this.props.melody.comment ? (
                <span className='comment'>
                  <span className='glyphicon glyphicon-comment' />
                  <span dangerouslySetInnerHTML={comment} />
                </span>
              ) : (
                null
              )}
              {this.props.melody.youtube ? (
                <span className='movie' dangerouslySetInnerHTML={{__html: this.props.melody.youtube}} />
              ) : (
                null
              )}
            </td>
          </tr>
        ) : (
          null
        )}
      </tbody>
    )
  }
}

Melody.propTypes = {
  melody: PropTypes.object.isRequired
}
