import React, { Component, PropTypes } from 'react'
import AdminAnimeRow from './admin_anime_row.js'
import { origin } from './../../../origin.js'

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
    $.ajax({
      url: origin + this.props.url,
      dataType: 'json',
      success: (res) => {
        this.setState({animes: res.animes})
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString())
      }
    })
  }

  render() {
    return (
      <div>
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
