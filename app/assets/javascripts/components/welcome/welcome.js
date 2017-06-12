import React, { Component } from 'react'
import Seasons from './_seasons.js'
import Tweets from './../menu/_tweets.js'
import Advertisement from './../menu/_advertisement.js'
import { origin } from './../../origin.js'

export default class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      advertisement: {}
    }
    this.handleDisplayAdvertisement = this.handleDisplayAdvertisement.bind(this)
  }

  componentWillMount() {
    this.loadAdvertisementBySeasonsFromServer() // TODO: 日付で取得できるようにする
  }

  handleDisplayAdvertisement(anime_id) {
    this.loadAdvertisementByAnimeFromServer(anime_id)
  }

  loadAdvertisementByAnimeFromServer(anime_id) {
    fetch(origin + 'api/animes/' + anime_id + '/advertisements')
      .then((res) => res.json())
      .then((res) => {
        this.setState({advertisement: res})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  loadAdvertisementBySeasonsFromServer() {
    fetch(origin + 'api/advertisements')
      .then((res) => res.json())
      .then((res) => {
        this.setState({advertisement: res})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    return (
      <div className='welcomeComponent'>
        <h1>{'放送中のアニメ'}</h1>
        <div className='col-md-9'>
          <Seasons onDisplayAdvertisement={this.handleDisplayAdvertisement} />
        </div>
        <div className='col-md-3'>
          <Advertisement advertisement={this.state.advertisement} />
          <div className='clear' />
          <Tweets />
        </div>
      </div>
    )
  }
}
