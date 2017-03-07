import React from 'react'
import expect from 'expect'
import { Link } from 'react-router'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'
import { Modal } from 'react-bootstrap'

expect.extend(expectJSX)

import AdminActorRow from '../../../../components/admin/actors/list/_admin_actor_row'
jest.unmock('../../../../components/admin/actors/list/_admin_actor_row')

describe('AdminActorRowComponent', () => {
  let renderer = createRenderer()

  it('propsに設定した値が出力される', () => {
    const actor = { id: 1, name: '声優 氏名' }
    renderer.render(
      <AdminActorRow actor={actor} handleLoad={jest.fn()} />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='adminActorRowComponent media' id='actor-1'>
        <div className='media-body'>
          <div className='name'>
            <Link to='/admin/actors/1'>{'声優 氏名'}</Link>
          </div>
        </div>
        <div className='media-right'>
          <div className='pull-right'>
            <span className='glyphicon glyphicon-trash link' onClick={jest.fn()} />
          </div>
        </div>
        <Modal show={false}>
          <Modal.Body>{'削除しますか？'}</Modal.Body>
          <Modal.Footer>
            <a className='btn btn-danger animate-button' onClick={jest.fn()}>
              {'はい'}
            </a>
            <a className='btn btn-default' onClick={jest.fn()}>
              {'いいえ'}
            </a>
          </Modal.Footer>
        </Modal>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
