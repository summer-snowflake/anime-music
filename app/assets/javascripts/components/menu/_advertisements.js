import React, { Component, PropTypes } from 'react'
import Advertisement from './_advertisement'
import { origin } from './../../origin.js'

export default class Advertisements extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className='advertisementsComponent'>
        <div className='panel panel-default'>
          <p className='menu-title'>{'おすすめPR'}</p>
          {this.props.advertisements.map((advertisement) =>
            <Advertisement advertisement={advertisement} key={advertisement.id} />
          )}
        </div>
      </div>
    )
  }
}

Advertisements.propTypes = {
  advertisements: PropTypes.array.isRequired
}
