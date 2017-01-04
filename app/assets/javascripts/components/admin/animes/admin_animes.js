import React, { Component } from 'react'
import AdminAnimesTable from './admin_animes_table.js'

export default class AdminAnimes extends Component {
  render() {
    return (
      <div>
        <AdminAnimesTable url='/admin/animes' />
      </div>
    )
  }
}
