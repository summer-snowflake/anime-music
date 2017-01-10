import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class AdminAnimeRow extends Component {
  render() {
    return (
      <div className='media adminAnimeRowComponent'>
        <div className='media-left'>
          <a href='#'>
            <img alt={this.props.anime.title} className='media-object' src={this.props.anime.picture} />
          </a>
        </div>
        <div className='media-body'>
          <h4 className='media-heading'>
            <Link to={'/admin/animes/' + this.props.anime.id}>
              {this.props.anime.title}
            </Link>
          </h4>
          <div className='summary'>
            {this.props.anime.summary}
          </div>
          <div className='wiki-url'>
            <a href={this.props.anime.wiki_url} target='_blank'>{this.props.anime.wiki_url}</a>
          </div>
        </div>
      </div>
    )
  }
}

AdminAnimeRow.propTypes = {
  anime: PropTypes.object.isRequired
}
