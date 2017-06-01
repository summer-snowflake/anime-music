import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Movie extends Component {
  render () {
    const comment = { __html: this.props.comment.replace(/\r?\n/g, '<br>') }
    return (
      <div className='movieComponent'>
        {this.props.youtube ? (
          <span className='movie pull-left' dangerouslySetInnerHTML={{__html: this.props.youtube}} />
        ) : (
          null
        )}
        {this.props.advertisement_body ? (
          <span className='cd pull-left'>
            <span className='label label-default' id='tag-name'>{'CD'}</span>
            <span dangerouslySetInnerHTML={{__html: this.props.advertisement_body}} />
          </span>
        ) : (
          null
        )}
        {this.props.comment ? (
          <span className='comment pull-left'>
            <span className='glyphicon glyphicon-comment' /><br />
            <span dangerouslySetInnerHTML={comment} />
          </span>
        ) : (
          null
        )}
        <div className='clear' />
      </div>
    )
  }
}

Movie.propTypes = {
  youtube: PropTypes.string,
  advertisement_body: PropTypes.string,
  comment: PropTypes.string
}
