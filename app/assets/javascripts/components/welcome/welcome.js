import React, { Component } from 'react'
import AnimeList from './_anime_list.js'
import Tweets from './../menu/_tweets.js'
import Advertisements from './../menu/_advertisements.js'
import { origin } from './../../origin.js'

export default class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      advertisements: []
    }
    this.handleDisplayAdvertisements = this.handleDisplayAdvertisements.bind(this)
  }

  componentWillMount() {
    this.loadAdvertisementsBySeasonsFromServer() // TODO: 日付で取得できるようにする
  }

  handleDisplayAdvertisements(season_id) {
    this.loadAdvertisementsBySeasonFromServer(season_id)
  }

  loadAdvertisementsBySeasonFromServer(season_id) {
    fetch(origin + 'api/seasons/' + season_id + '/advertisements')
      .then((res) => res.json())
      .then((res) => {
        this.setState({advertisements: res.advertisements})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  loadAdvertisementsBySeasonsFromServer(season_id) {
    fetch(origin + 'api/advertisements')
      .then((res) => res.json())
      .then((res) => {
        this.setState({advertisements: res.advertisements})
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
          <AnimeList handleDisplayAdvertisements={this.handleDisplayAdvertisements} />
        </div>
        <div className='col-md-3'>
          {this.state.advertisements.length > 0 ? (
            <Advertisements advertisements={this.state.advertisements} />
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
