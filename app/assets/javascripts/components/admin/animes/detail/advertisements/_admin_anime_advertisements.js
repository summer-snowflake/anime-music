import React, { Component, PropTypes } from 'react'
//import { origin } from './../../../../../origin'
import AdminAnimeAdvertisementNewField from './_admin_anime_advertisement_new_field'

export default class AdminAnimeAdvertisements extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='adminAnimeAdvertisementsComponent'>
        <AdminAnimeAdvertisementNewField anime_id={this.props.anime_id} handleLoadAdvertisements={this.loadAdvertisementsFromServer} />
      </div>
    )
  }
}

AdminAnimeAdvertisements.propTypes = {
  anime_id: PropTypes.string.isRequired
}
