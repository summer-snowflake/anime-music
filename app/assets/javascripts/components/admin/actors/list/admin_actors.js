import React, { Component } from 'react'
import AdminActorsTable from './_admin_actors_table.js'

export default class AdminActors extends Component {
  render() {
    return (
      <div className='adminActorsComponent'>
        <AdminActorsTable />
      </div>
    )
  }
}
