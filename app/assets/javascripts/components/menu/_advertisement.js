import React, { Component, PropTypes } from 'react'

export default class Advertisement extends Component {
  render () {
    return (
      <div className='advertisementComponent' id={'advertisement-' + this.props.advertisement.id}>
        <span dangerouslySetInnerHTML={{__html: this.props.advertisement.body}} />
      </div>
    )
  }
}

Advertisement.propTypes = {
  advertisement: PropTypes.object.isRequired
}
