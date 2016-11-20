import React, { Component } from 'react'
import { Link } from 'react-router'

export default class AdminAnimeRow extends Component {
  render() {
    return (
      <tr id={'anime-' + this.props.anime.id}>
        <td><Link to={'/admin/animes/' + this.props.anime.id}>{this.props.anime.title}</Link></td>
        <td>{this.props.anime.summary}</td>
        <td>{this.props.anime.wiki_url}</td>
        <td>{this.props.anime.picture}</td>
      </tr>
    )
  }
}
