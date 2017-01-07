import React from 'react'
import expect from 'expect'
import { renderIntoDocument } from 'react-addons-test-utils'
import { shallow } from 'enzyme'
import expectJSX from 'expect-jsx'
import 'jest-fetch-mock'
import reactElementToJSXString from 'react-element-to-jsx-string'

expect.extend(expectJSX)

import AdminAnimeDetail from '../../../../components/admin/animes/detail/_admin_anime_detail'
import AdminAnimeTitle from '../../../../components/admin/animes/detail/_admin_anime_title'
jest.unmock('../../../../components/admin/animes/detail/_admin_anime_detail')

describe('AdminAnimeDetailComponent', () => {
  it('state初期値が設定されていること', () => {
    const component = renderIntoDocument(
      <AdminAnimeDetail url='api/admin/animes/1' />
    )
    expect(component.state.anime.title).toBe('')
    expect(component.state.anime.summary).toBe('')
    expect(component.state.anime.wiki_url).toBe('')
  })

  it('表示', () => {
    const component = shallow(
      <AdminAnimeDetail url='api/admin/animes/1' />
    )
    component.setState({anime: { id: 1, title: 'アニメタイトル', summary: 'アニメサマリ', wiki_url: 'https://wiki.com' }})

    let actualElement = component.single(reactElementToJSXString)
    let expectedElement = (
      <div className='adminAnimeDetailComponent'>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <AdminAnimeTitle id={1} title='アニメタイトル' />
            <hr />
            {'アニメサマリ'}
          </div>
        </div>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
