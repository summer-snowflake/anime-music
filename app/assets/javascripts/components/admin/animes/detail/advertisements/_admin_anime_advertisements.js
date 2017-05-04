import React, { Component, PropTypes } from 'react'
import { origin } from './../../../../../origin'
import AdminAnimeAdvertisement from './_admin_anime_advertisement'
import AdminAnimeAdvertisementNewField from './_admin_anime_advertisement_new_field'

export default class AdminAnimeAdvertisements extends Component {
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
    fetch(origin + 'api/admin/animes/' + this.props.anime_id + '/advertisements', {
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
      <div className='adminAnimeAdvertisementsComponent'>
        <AdminAnimeAdvertisementNewField anime_id={this.props.anime_id} handleLoadAdvertisements={this.loadAdvertisementsFromServer} />
        <ul className='advertisements'>
        {this.state.advertisements.map((advertisement) =>
          <li key={advertisement.id}>
            <AdminAnimeAdvertisement advertisement={advertisement} handleLoadAdvertisements={this.loadAdvertisementsFromServer} />
          </li>
        )}
        </ul>
      </div>
    )
  }
}

AdminAnimeAdvertisements.propTypes = {
  anime_id: PropTypes.string.isRequired
}
