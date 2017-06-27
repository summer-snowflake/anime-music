import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { origin } from './../../../../origin.js'

export default class AdminMelodyDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      melody: {
        title: '',
        kind: '',
        youtube: '',
        singer_name: '',
        lyric_writer: '',
        composer: '',
        adapter: '',
        memo: '',

      }
    }
  }

  componentDidMount() {
    this.loadMelodyFromServer()
  }

  loadMelodyFromServer() {
    fetch(origin + 'api/admin/melodies/' + this.props.melody_id, {
      headers: {'Authorization': 'Token token=' + localStorage.getItem('access_token')}
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({melody: res})
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    return (
      <div className='adminMelodyDetailComponent'>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <div className='label label-info kind-label'>
              {this.state.melody.kind.toUpperCase()}
            </div>
            <div className='title'>
              <span className='glyphicon glyphicon-music' />
              {this.state.melody.title}
            </div>
            <div className='singer_name'>
              {'歌　: ' + (this.state.melody.singer_name || '')}
            </div>
            <div className='lyric_writer'>
              {'作詞: ' + this.state.melody.lyric_writer}
            </div>
            <div className='composer'>
              {'作曲: ' + this.state.melody.composer}
            </div>
            <div className='adapter'>
              {'編曲: ' + this.state.melody.adapter}
            </div>
            <div className='memo'>
              {'メモ: ' + this.state.melody.memo}
            </div>
            <div className='youtube'>
              <span dangerouslySetInnerHTML={{__html: this.state.melody.youtube}} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AdminMelodyDetail.propTypes = {
  melody_id: PropTypes.string.isRequired
}
