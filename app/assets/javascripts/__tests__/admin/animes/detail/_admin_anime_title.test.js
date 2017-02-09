import React from 'react'
import expect from 'expect'
import { Simulate, createRenderer, renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'
import 'jest-fetch-mock'

expect.extend(expectJSX)

import AdminAnimeTitle from '../../../../components/admin/animes/detail/_admin_anime_title'
import MessageBox from '../../../../components/common/_message_box'
import LoadingImage from '../../../../components/common/_loading_image'
jest.unmock('../../../../components/admin/animes/detail/_admin_anime_title')

describe('AdminAnimeDetailComponent', () => {
  it('propsに設定した値が出力されること', () => {
    let renderer = createRenderer()
    renderer.render(
      <AdminAnimeTitle id='1' title='アニメタイトル' />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='adminAnimeTitleComponent'>
        <div className="not-editing-title">
          <b>{'アニメタイトル'}</b>
          <a href='#'>
            <span className='right-icon' onClick={jest.fn()}>
              <span className='glyphicon glyphicon-pencil' />
            </span>
          </a>
        </div>
        <MessageBox message='' message_type='success' />
        <LoadingImage />
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })

  it('state初期値が設定されていること', () => {
    const component = renderIntoDocument(
      <AdminAnimeTitle id='1' title='アニメタイトル' />
    )
    expect(component.state.editingTitle).toBe(false)
    expect(component.state.title).toBe('アニメタイトル')
  })

  it('アイコンをクリックすると編集モードになること', () => {
    const component = renderIntoDocument(
      <AdminAnimeTitle id='1' title='アニメタイトル' />
    )
    expect(component.state.editingTitle).toBe(false)

    Simulate.click(findRenderedDOMComponentWithClass(component, 'right-icon'))
    expect(component.state.editingTitle).toBe(true)
    expect(findRenderedDOMComponentWithClass(component, 'editing-title')).toExist
  })
})
