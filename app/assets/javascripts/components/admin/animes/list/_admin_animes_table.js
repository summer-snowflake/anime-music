import React, { Component } from 'react'
import AdminAnimeRow from './_admin_anime_row.js'
import AdminAnimeNewForm from './_admin_anime_new_form.js'
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
    fetch(origin + 'api/admin/animes', {
      headers: {'Authorization': 'Token token=' + localStorage.getItem('access_token')}
    })
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
        <AdminAnimeNewForm handleLoad={this.loadAnimesFromServer} />
        {this.state.animes.map((anime) =>
          <AdminAnimeRow anime={anime} handleLoad={this.loadAnimesFromServer} key={anime.id} />
        )}
      </div>
    )
  }
}
