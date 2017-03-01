import React from 'react'
import expect from 'expect'
import { Simulate, createRenderer, renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'
import 'jest-fetch-mock'

expect.extend(expectJSX)

import AdminAnimeBody from '../../../../components/admin/animes/detail/_admin_anime_body'
import MessageBox from '../../../../components/common/_message_box'
jest.unmock('../../../../components/admin/animes/detail/_admin_anime_body')

describe('AdminAnimeBodyComponent', () => {
  it('propsに設定した値が出力されること', () => {
    let renderer = createRenderer()
    renderer.render(
      <AdminAnimeBody id={1} onLoadAnime={jest.fn()} summary='アニメサマリ' wiki_url='https://wiki.com' />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='adminAnimeBodyComponent'>
        <div className='not-editing-body'>
          <div className='summary'>
            {'アニメサマリ'}
          </div>
          <div className='wiki-url'>
            <a href='https://wiki.com' target='_blank'>{'https://wiki.com'}</a>
          </div>
          <div className='pull-right'>
            <span className='link' onClick={jest.fn()}>
              <span className='glyphicon glyphicon-pencil' />
            </span>
          </div>
          <MessageBox message='' message_type='success' />
        </div>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })

  it('state初期値が設定されていること', () => {
    const component = renderIntoDocument(
      <AdminAnimeBody id={1} onLoadAnime={jest.fn()} summary='アニメサマリ' wiki_url='https://wiki.com' />
    )
    expect(component.state.editingBody).toBe(false)
    expect(component.state.loadingBody).toBe(false)
  })

  it('アイコンをクリックすると編集モードになること', () => {
    const component = renderIntoDocument(
      <AdminAnimeBody id={1} onLoadAnime={jest.fn()} summary='アニメサマリ' wiki_url='https://wiki.com' />
    )
    expect(component.state.editingBody).toBe(false)

    Simulate.click(findRenderedDOMComponentWithClass(component, 'link'))
    expect(component.state.editingBody).toBe(true)
    expect(findRenderedDOMComponentWithClass(component, 'editing-body')).toExist
  })
})
