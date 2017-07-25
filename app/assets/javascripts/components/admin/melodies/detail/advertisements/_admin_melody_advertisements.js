import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { origin } from './../../../../../origin'
import AdminAdvertisement from './../../../common/_admin_advertisement'
import AdminMelodyAdvertisementNewField from './_admin_melody_advertisement_new_field'

export default class AdminMelodyAdvertisements extends Component {
  constructor(props) {
    super(props)
    this.state = {
      advertisements: []
    }
    this.loadAdvertisementsFromServer = this.loadAdvertisementsFromServer.bind(this)
  }

  componentDidMount() {
    this.loadAdvertisementsFromServer()
  }

  loadAdvertisementsFromServer() {
    fetch(origin + 'api/admin/melodies/' + this.props.melody_id + '/advertisements', {
      headers: {'Authorization': 'Token token=' + localStorage.getItem('access_token')}
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({advertisements: res.advertisements})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    return (
      <div className='adminMelodyAdvertisementsComponent'>
        <AdminMelodyAdvertisementNewField handleLoadAdvertisements={this.loadAdvertisementsFromServer} melody_id={this.props.melody_id} />
        <ul className='advertisements'>
          {this.state.advertisements.map((advertisement) => (
            <li key={advertisement.id}>
              <AdminAdvertisement advertisement={advertisement} handleLoadAdvertisements={this.loadAdvertisementsFromServer} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

AdminMelodyAdvertisements.propTypes = {
  melody_id: PropTypes.string.isRequired
}
