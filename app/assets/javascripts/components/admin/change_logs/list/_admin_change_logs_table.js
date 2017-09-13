import React, { Component } from 'react'
import AdminChangeLogRow from './_admin_change_log_row.js'
import { origin } from './../../../../origin.js'

export default class AdminChangeLogsTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anime_logs: []
    }
    this.loadChangeLogsFromServer = this.loadChangeLogsFromServer.bind(this)
  }

  componentDidMount() {
    this.loadChangeLogsFromServer()
  }

  loadChangeLogsFromServer() {
    fetch(origin + 'api/admin/change_logs', {
      headers: {'Authorization': 'Token token=' + localStorage.getItem('access_token')}
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({anime_logs: res.anime_logs})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    return (
      <div className='adminChangeLogsTableComponent'>
        <h5>{'【アニメ】'}</h5>
        <table className='table table-bordered'>
          <tbody>
            {this.state.anime_logs.map((anime_log) =>
              <AdminChangeLogRow change_log={anime_log} handleLoad={this.loadChangeLogsFromServer} key={anime_log.id} />
            )}
          </tbody>
        </table>
      </div>
    )
  }
}
