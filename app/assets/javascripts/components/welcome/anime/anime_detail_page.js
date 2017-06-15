import React, { Component } from 'react'
import Advertisement from './../../menu/_advertisement'
import Tweets from './../../menu/_tweets'
import Anime from './../_anime'
import { origin } from './../../../origin'

export default class AnimeDetailPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anime: undefined
    }
    this.handleClickPR = this.handleClickPR.bind(this)
  }

  handleClickPR() {
    this.refs.advertisement.refreshAnimeAdvertisement()
  }

  componentWillMount() {
    this.loadAnimeFromServer()
  }

  loadAnimeFromServer() {
    fetch(origin + 'api/animes/' + this.props.params.animeId)
      .then((res) => res.json())
      .then((res) => {
        this.setState({anime: res})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    return (
      <div className='animeDetailPageComponent'>
        <div className='col-md-12'>
          <h1>{(this.state.anime || {}).title}</h1>
        </div>
        <div className='col-md-9'>
          <div className='panel panel-default'>
            <div className='panel-body'>
              {this.state.anime ? (
                <Anime anime={this.state.anime} onClickPR={this.handleClickPR} />
              ) : (
                null
              )}
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <Advertisement anime_id={Number(this.props.params.animeId)} ref='advertisement' />
          <div className='clear' />
          <Tweets />
        </div>
      </div>
    )
  }
}
