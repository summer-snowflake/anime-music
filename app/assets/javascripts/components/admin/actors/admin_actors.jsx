import React, { Component } from 'react'
import AdminActorsTable from './admin_actors_table.jsx'

export default class AdminActors extends Component {
  render() {
    return (
      <div>
        <AdminActorsTable url='/api/admin/actors' />
      </div>
    )
  }
}
