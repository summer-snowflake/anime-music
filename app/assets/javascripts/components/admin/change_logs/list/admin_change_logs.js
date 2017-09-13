import React, { Component } from 'react'
import AdminChangeLogsTable from './_admin_change_logs_table.js'

export default class AdminChangeLogs extends Component {
  render() {
    return (
      <div className='adminChangeLogsComponent'>
        <AdminChangeLogsTable />
      </div>
    )
  }
}
