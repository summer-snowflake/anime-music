import React, { Component } from 'react'
import AdminAnimesTable from './_admin_animes_table.js'

export default class AdminAnimes extends Component {
  render() {
    return (
      <div className='adminAnimesComponent'>
        <AdminAnimesTable url='api/admin/animes' />
      </div>
    )
  }
}
