import React from 'react'
import expect from 'expect'
import { Simulate, createRenderer, renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils'
import { shallow } from 'enzyme'
import expectJSX from 'expect-jsx'
import 'jest-fetch-mock'
//import reactElementToJSXString from 'react-element-to-jsx-string'

expect.extend(expectJSX)

import AdminAnimeTitle from '../../../../components/admin/animes/detail/_admin_anime_title'
jest.unmock('../../../../components/admin/animes/detail/_admin_anime_title')

describe('AdminAnimeDetailComponent', () => {
  it('propsに設定した値が出力されること', () => {
    let renderer = createRenderer()
    renderer.render(
      <AdminAnimeTitle title='アニメタイトル' id='1' />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='adminAnimeTitleComponent'>
        <div className="notEditingTitle">
          {'アニメタイトル'}
          <span className='right-icon' onClick={jest.fn()}>
            <span className='glyphicon glyphicon-pencil' />
          </span>
        </div>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })

  it('state初期値が設定されていること', () => {
    const component = renderIntoDocument(
      <AdminAnimeTitle title='アニメタイトル' id='1' />
    )
    expect(component.state.editingTitle).toBe(false)
    expect(component.state.title).toBe('アニメタイトル')
  })

  it('アイコンをクリックすると編集モードになること', () => {
    const component = renderIntoDocument(
      <AdminAnimeTitle title='アニメタイトル' id='1' />
    )
    expect(component.state.editingTitle).toBe(false)

    Simulate.click(findRenderedDOMComponentWithClass(component, 'right-icon'))
    expect(component.state.editingTitle).toBe(true)
    expect(findRenderedDOMComponentWithClass(component, 'form-inline')).toExist
  })
})
