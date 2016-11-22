import React, { Component } from 'react'

export default React.createClass({
  loadAnimesFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: (res) => {
        this.setState({anime: res})
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString())
      }
    })
  },

  componentDidMount() {
    this.loadAnimesFromServer()
  },

  getInitialState() {
    return { anime: {} }
  },

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
})
