import React, { Component } from 'react'
import AdminAnimeRow from './_admin_anime_row.js'
import { origin } from './../../../../origin.js'

export default class AdminAnimesTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animes: []
    }
    this.loadAnimesFromServer = this.loadAnimesFromServer.bind(this)
  }

  componentDidMount() {
    this.loadAnimesFromServer()
  }

  loadAnimesFromServer() {
    fetch(origin + 'api/admin/animes')
      .then((res) => res.json())
      .then((res) => {
        this.setState({animes: res.animes})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    return (
      <div className='adminAnimesTableComponent'>
        {this.state.animes.map((anime) =>
          <AdminAnimeRow anime={anime} handleLoad={this.loadAnimesFromServer} key={anime.id} />
        )}
      </div>
    )
  }
}
