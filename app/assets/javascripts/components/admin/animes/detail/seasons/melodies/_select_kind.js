import React, { Component, PropTypes } from 'react'

export default class SelectKind extends Component {
  constructor(props) {
    super(props)
    this.handleChangeKind = this.handleChangeKind.bind(this)
  }

  handleChangeKind(e) {
    this.props.onChangeKind(e)
  }

  render () {
    return (
      <div className='selectKindComponent'>
        {['OP', 'ED', 'IM', 'IN'].map((kind, i) =>
          <label className={'label ' + (this.props.kind == kind ? 'label-info' : 'label-default')} id={kind} key={i} onClick={this.handleChangeKind} value={kind}>
            {kind}
          </label>
        )}
        <input ref='kind' type='hidden' value={this.props.kind} />
      </div>
    )
  }
}

SelectKind.propTypes = {
  kind: PropTypes.string.isRequired,
  onChangeKind: PropTypes.func.isRequired
}
