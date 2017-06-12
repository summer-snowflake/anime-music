import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Advertisement extends Component {
  render () {
    return (
      <div className='advertisementComponent'>
        <div className='panel panel-default'>
          <p className='menu-title'>{'おすすめPR'}</p>
          <div className='advertisement'>
            <span className='label label-default' id='tag-name'>{this.props.advertisement.tag_name}</span>
            <span dangerouslySetInnerHTML={{__html: this.props.advertisement.body}} />
          </div>
        </div>
      </div>
    )
  }
}

Advertisement.propTypes = {
  advertisement: PropTypes.object.isRequired
}
