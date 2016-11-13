import React from 'react'
import AdminAnimeRow from './admin_anime_row.jsx'

export default React.createClass({
  loadAnimesFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: (res) => {
        this.setState({animes: res.animes})
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString())
      }
    })
  },

  componentDidMount() {
    this.loadAnimesFromServer()
  },

  getInitialState() {
    return { animes: [] }
  },

  render() {
    return (
      <table className='table'>
        <tbody>
          {this.state.animes.map((anime) =>
            <AdminAnimeRow key={anime.id} anime={anime} />
          )}
        </tbody>
      </table>
    )
  }
})
