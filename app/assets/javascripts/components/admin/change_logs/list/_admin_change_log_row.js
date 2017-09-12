import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router'
import { origin } from './../../../../origin.js'

export default class AdminChangeLogRow extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let object_changes = Object.keys(this.props.change_log.object_changes)

    return (
      <tr className='media adminChangeLogRowComponent' id={'anime_log-' + this.props.change_log.id}>
        <td>
          {this.props.change_log.event}
        </td>
        <td>
          <Link className='link' to={'/admin/animes/' + this.props.change_log.item_id}>
            {this.props.change_log.item_title}
          </Link>
        </td>
        <td>
          {this.props.change_log.operator_email}
        </td>
        <td>
          <ul className='list-group'>
            {object_changes.map((change_key, index) =>
              <li className='list-group-item' key={index}>
                <b>{change_key + ' : '}</b>
                {'『' + this.props.change_log.object_changes[change_key][0] + '』→『' + this.props.change_log.object_changes[change_key][1] + '』'}
              </li>
            )}
          </ul>
        </td>
      </tr>
    )
  }
}

AdminChangeLogRow.propTypes = {
  change_log: PropTypes.object.isRequired,
  handleLoad: PropTypes.func.isRequired
}
