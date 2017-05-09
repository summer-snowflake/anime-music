import React, { Component, PropTypes } from 'react'
import Advertisement from './_advertisement'

export default class Advertisements extends Component {
  render () {
    return (
      <div className='advertisementsComponent'>
        <span className='pull-left label label-default'>{'PR'}</span>
        {this.props.advertisements.map((advertisement) =>
          <Advertisement key={advertisement.id} advertisement={advertisement} />
        )}
      </div>
    )
  }
}

Advertisements.propTypes = {
  advertisements: PropTypes.array.isRequired
}
