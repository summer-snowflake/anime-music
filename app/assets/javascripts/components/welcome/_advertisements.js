import React, { Component, PropTypes } from 'react'
import Advertisement from './_advertisement'
import { origin } from './../../origin.js'

export default class Advertisements extends Component {
  constructor(props) {
    super(props)
    this.state = {
      advertisements: this.props.advertisements
    }
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
      <div className='advertisementsComponent clear'>
        {this.props.advertisements.length > 0 ? (
          <div>
            <span className='label label-default'>{'PR'}</span>
          </div>
        ) : (
          null
        )}
        {this.state.advertisements.map((advertisement) =>
          <Advertisement advertisement={advertisement} key={advertisement.id} />
        )}
        {this.props.advertisements.length > 0 ? (
          <div className='refresh-field'>
            <span className='pull-right link glyphicon glyphicon-refresh' onClick={this.handleRefreshAdvertisements} />
          </div>
        ) : (
          null
        )}
      </div>
    )
  }
}

Advertisements.propTypes = {
  advertisements: PropTypes.array.isRequired,
  season_id: PropTypes.number.isRequired

}
