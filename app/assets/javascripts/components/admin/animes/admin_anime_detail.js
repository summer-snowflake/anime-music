import React, { Component, PropTypes } from 'react'
import { origin } from './../../../origin.js'

export default class AdminAnimeDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anime: {}
    }
  }

  componentDidMount() {
    this.loadAnimesFromServer()
  }

  loadAnimesFromServer() {
    fetch(origin + this.props.url)
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
      <div className='panel panel-default'>
        <div className='panel-heading'>
          {this.state.anime.title}
        </div>
        <div className='panel-body'>
          {this.state.anime.summary}
        </div>
      </div>
    )
  }
}

AdminAnimeDetail.propTypes = {
  url: PropTypes.string.isRequired
}
