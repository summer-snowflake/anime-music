import React, { Component } from 'react'
import Seasons from './_seasons.js'
import Tweets from './../menu/_tweets.js'
import Advertisement from './../menu/_advertisement.js'

export default class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anime_id: undefined
    }
    this.handleDisplayAdvertisement = this.handleDisplayAdvertisement.bind(this)
  }

  handleDisplayAdvertisement(anime_id) {
    this.setState({anime_id: anime_id})
  }

  render() {
    return (
      <div className='welcomeComponent'>
        <h1>{'放送中のアニメ'}</h1>
        <div className='col-md-9'>
          <Seasons onDisplayAdvertisement={this.handleDisplayAdvertisement} />
        </div>
        <div className='col-md-3'>
          <Advertisement anime_id={this.state.anime_id} />
          <div className='clear' />
          <Tweets />
        </div>
      </div>
    )
  }
}
