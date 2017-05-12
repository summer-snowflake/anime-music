import React, { Component } from 'react'
import AnimeList from './_anime_list.js'

export default class Welcome extends Component {
  componentWillMount() {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.charSet = 'utf-8'
    document.body.appendChild(script)
  }

  render() {
    return (
      <div className='welcomeComponent'>
        <h1>{'放送中のアニメ'}</h1>
        <div className='col-md-9'>
          <AnimeList />
        </div>
        <div className='col-md-3 twitter-widget'>
          <div className='panel panel-default'>
            <a className='twitter-timeline' data-width='500' href='https://twitter.com/anison_time'>{'Tweets by anison_time'}</a>
          </div>
        </div>
      </div>
    )
  }
}
