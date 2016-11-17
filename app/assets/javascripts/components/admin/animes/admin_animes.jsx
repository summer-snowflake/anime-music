import React, { Component } from 'react'
import AdminAnimesTable from './admin_animes_table.jsx'

export default class AdminAnimes extends Component {
  render() {
    return (
      <div>
        <AdminAnimesTable url='/api/admin/animes' />
      </div>
    )
  }
}
