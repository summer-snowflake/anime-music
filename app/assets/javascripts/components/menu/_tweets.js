import React, { Component } from 'react'

export default class Tweets extends Component {
  componentWillMount() {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.charSet = 'utf-8'
    document.body.appendChild(script)
  }

  render() {
    return (
      <div className='tweetsComponent twitter-widget'>
        <div className='panel panel-default'>
          <a className='twitter-timeline' data-width='500' href='https://twitter.com/anison_time'>{'Tweets by anison_time'}</a>
        </div>
      </div>
    )
  }
}
