import React from 'react'

class AdminAnimeRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.anime.title}</td>
        <td>{this.props.anime.summary}</td>
        <td>{this.props.anime.wiki_url}</td>
        <td>{this.props.anime.picture}</td>
        <td><a href={'/admin/animes/' + this.props.anime.id}>Show</a></td>
        <td><a href={'/admin/animes/' + this.props.anime.id + '/edit'}>Edit</a></td>
        <td><a href={'/admin/animes/' + this.props.anime.id} data-method='delete'>Destroy</a></td>
      </tr>
    )
  }
}

module.exports = AdminAnimeRow
