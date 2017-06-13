import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { origin } from './../../origin.js'

export default class Advertisement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      advertisement: {}
    }
  }

  componentWillMount() {
    this.loadAdvertisementBySeasonsFromServer() // TODO: 日付で取得できるようにする
  }

  componentWillReceiveProps() {
    if(this.props.anime_id) {
      this.loadAdvertisementByAnimeFromServer()
    } else {
      this.loadAdvertisementBySeasonsFromServer() // TODO: 日付で取得できるようにする
    }
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

  loadAdvertisementByAnimeFromServer() {
    fetch(origin + 'api/animes/' + this.props.anime_id + '/advertisements')
      .then((res) => res.json())
      .then((res) => {
        this.setState({advertisement: res})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render () {
    return (
      <div className='advertisementComponent'>
        <div className='panel panel-default'>
          <p className='menu-title'>{'おすすめPR'}</p>
          <div className='advertisement'>
            <span className='label label-default' id='tag-name'>{this.state.advertisement.tag_name}</span>
            <span dangerouslySetInnerHTML={{__html: this.state.advertisement.body}} />
          </div>
        </div>
      </div>
    )
  }
}

Advertisement.propTypes = {
  anime_id: PropTypes.number
}
