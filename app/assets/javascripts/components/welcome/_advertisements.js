import React, { Component, PropTypes } from 'react'
import Advertisement from './_advertisement'

export default class Advertisements extends Component {
  render () {
    return (
      <div className='advertisementsComponent'>
        {this.props.advertisements.length > 0 ? (
          <div>
            <span className='pull-left label label-default'>{'PR'}</span>
            <span className='link glyphicon glyphicon-refresh' />
          </div>
        ) : (
          null
        )}
        {this.props.advertisements.map((advertisement) =>
          <Advertisement advertisement={advertisement} key={advertisement.id} />
        )}
      </div>
    )
  }
}

Advertisements.propTypes = {
  advertisements: PropTypes.array.isRequired
}
