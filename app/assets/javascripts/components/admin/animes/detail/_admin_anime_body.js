import React, { Component, PropTypes } from 'react'

export default class AdminAnimeBody extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editingBody: false
    }
    this.handleClickEditButton = this.handleClickEditButton.bind(this)
    this.handleClickCancelButton = this.handleClickCancelButton.bind(this)
  }

  handleClickEditButton() {
    this.setState({editingBody: true})
  }

  handleClickCancelButton() {
    this.setState({editingBody: false})
  }

  render() {
    let editing_jsx = (
      <div className='editing-body'>
        <div className='summary'>
          <textarea autoFocus className='form-control' rows='4' defaultValue={this.props.summary} />
        </div>
        <div className='wiki-url'>
          <input type='text' className='form-control' defaultValue={this.props.wiki_url} />
        </div>
        <div className='pull-right'>
          <button className='btn btn-default' type='submit' onClick={this.handleClickCancelButton}>
            {'更新'}
          </button>
          <button className='btn btn-default cancel-button' type='submit' onClick={this.handleClickCancelButton}>
            {'キャンセル'}
          </button>
        </div>
      </div>
    )

    let not_editing_jsx = (
      <div className='not-editing-body'>
        <div className='summary'>
          {this.props.summary}
        </div>
        <div className='wiki-url'>
          <a href={this.props.wiki_url} target='_blank'>{this.props.wiki_url}</a>
        </div>
        <div className='pull-right'>
          <button className='btn btn-default' type='submit' onClick={this.handleClickEditButton}>
            <span className='glyphicon glyphicon-pencil' />
          </button>
        </div>
      </div>
    )

    return (
      <div className='adminAnimeBodyComponent'>
        {(() => {
          if (this.state.editingBody)
            return editing_jsx
          else
            return not_editing_jsx
        })()}
      </div>
    )
  }
}

AdminAnimeBody.propTypes = {
  summary: PropTypes.string.isRequired,
  wiki_url: PropTypes.string.isRequired
}
