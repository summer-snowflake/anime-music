import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Advertisement extends Component {
  render () {
    return (
      <div className='advertisementComponent' id={'advertisement-' + this.props.advertisement.id}>
        <span className='label label-default' id='tag-name'>{this.props.advertisement.tag_name}</span>
        <span dangerouslySetInnerHTML={{__html: this.props.advertisement.body}} />
      </div>
    )
  }
}

Advertisement.propTypes = {
  advertisement: PropTypes.object.isRequired
}
