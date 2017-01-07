import React, { Component, PropTypes } from 'react'
import AdminAnimeRow from './_admin_anime_row.js'
import { origin } from './../../../../origin.js'

export default class AdminAnimesTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animes: []
    }
  }

  componentDidMount() {
    this.loadAnimesFromServer()
  }

  loadAnimesFromServer() {
    fetch(origin + this.props.url)
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
        <table className='table'>
          <tbody>
            {this.state.animes.map((anime) =>
              <AdminAnimeRow anime={anime} key={anime.id} />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

AdminAnimesTable.propTypes = {
  url: PropTypes.string.isRequired
}
