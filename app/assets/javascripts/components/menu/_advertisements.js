import React, { Component, PropTypes } from 'react'
import Advertisement from './_advertisement'
import { origin } from './../../origin.js'

export default class Advertisements extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshAdvertisements = this.handleRefreshAdvertisements.bind(this)
  }

  handleRefreshAdvertisements() {
    this.loadAdvertisementsFromServer()
  }

  loadAdvertisementsFromServer() {
    fetch(origin + 'api/seasons/' + this.props.season_id + '/advertisements')
      .then((res) => res.json())
      .then((res) => {
        this.setState({advertisements: res.advertisements})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render () {
    return (
      <div className='advertisementsComponent'>
        <div className='panel panel-default'>
          {this.props.advertisements.map((advertisement) =>
            <Advertisement advertisement={advertisement} key={advertisement.id} />
          )}
        </div>
      </div>
    )
  }
}

Advertisements.propTypes = {
  advertisements: PropTypes.array.isRequired,
  season_id: PropTypes.number
}
