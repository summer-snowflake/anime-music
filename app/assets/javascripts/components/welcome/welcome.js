import React, { Component } from 'react'
import Seasons from './_seasons.js'
import Tweets from './../menu/_tweets.js'
import Advertisement from './../menu/_advertisement.js'
import { origin } from './../../origin.js'

export default class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      advertisement: null
    }
    this.handleDisplayAdvertisement = this.handleDisplayAdvertisement.bind(this)
  }

  componentWillMount() {
    this.loadAdvertisementsFromServer() // TODO: 日付で取得できるようにする
  }

  handleDisplayAdvertisement(anime_id) {
    this.loadAdvertisementsByAnimeFromServer(anime_id)
  }

  loadAdvertisementsByAnimeFromServer(anime_id) {
    fetch(origin + 'api/animes/' + anime_id + '/advertisements')
      .then((res) => res.json())
      .then((res) => {
        this.setState({advertisement: res})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  loadAdvertisementsFromServer() {
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
          {this.state.advertisement ? (
            <Advertisement advertisement={this.state.advertisement} />
          ) : (
            null
          )}
          <div className='clear' />
          <Tweets />
        </div>
      </div>
    )
  }
}
