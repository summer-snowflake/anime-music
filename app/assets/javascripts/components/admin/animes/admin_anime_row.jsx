import React, { Component } from 'react'
import { Link } from 'react-router'

export default class AdminAnimeRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.anime.title}</td>
        <td>{this.props.anime.summary}</td>
        <td>{this.props.anime.wiki_url}</td>
        <td>{this.props.anime.picture}</td>
      </tr>
    )
  }
}
