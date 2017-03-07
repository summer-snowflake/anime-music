import React from 'react'
import expect from 'expect'
import { Link } from 'react-router'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import DestroyModal from '../../../../components/common/_destroy_modal'
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
          <div className='media-heading name'>
            <Link to='/admin/actors/1'>{'声優 氏名'}</Link>
          </div>
        </div>
        <div className='media-right'>
          <div className='pull-right'>
            <span className='glyphicon glyphicon-trash link' onClick={jest.fn()} />
          </div>
        </div>
        <DestroyModal closeModal={jest.fn()} showModal={false} submitModal={jest.fn()} />
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
