import React, { Component, PropTypes } from 'react'

export default class LoadingImage extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className='loadingImageComponent'>
        <div>Loading...</div>
      </div>
    )
  }
}
