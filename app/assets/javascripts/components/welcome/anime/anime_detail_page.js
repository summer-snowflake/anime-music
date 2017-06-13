import React, { Component } from 'react'
import Advertisement from './../../menu/_advertisement'
import Tweets from './../../menu/_tweets'
//import { origin } from './../../origin.js'

export default class AnimeDetailPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='animeDetailPageComponent'>
        <div className='col-md-9'>
        </div>
        <div className='col-md-3'>
          <Advertisement />
          <div className='clear' />
          <Tweets />
        </div>
      </div>
    )
  }
}
