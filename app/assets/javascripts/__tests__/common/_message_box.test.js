import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import MessageBox from '../../components/common/_message_box'
jest.unmock('../../components/common/_message_box')

describe('messageBoxComponent', () => {
  let renderer = createRenderer()

  it('propsに設定した値が出力される', () => {
    renderer.render(
      <MessageBox message='出力メッセージ' message_type='success' />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='messageBoxComponent'>
        <div className='alert alert-success'>
          {'出力メッセージ'}
        </div>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
