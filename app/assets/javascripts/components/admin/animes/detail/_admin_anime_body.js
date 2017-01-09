import React, { Component, PropTypes } from 'react'

export default class AdminAnimeBody extends Component {
  render() {
    return (
      <div className='adminAnimeBodyComponent'>
        <div className='summary'>
          {this.props.summary}
        </div>
        <div className='wiki-url'>
          <a href={this.props.wiki_url} target='_blank'>{this.props.wiki_url}</a>
        </div>
        <div className='pull-right'>
          <button className='btn btn-default' type='submit'>
            <span className='glyphicon glyphicon-pencil' />
          </button>
        </div>
      </div>
    )
  }
}

AdminAnimeBody.propTypes = {
  summary: PropTypes.string.isRequired,
  wiki_url: PropTypes.string.isRequired
}
