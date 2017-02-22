import React from 'react'
import expect from 'expect'
import { renderIntoDocument } from 'react-addons-test-utils'
import { shallow } from 'enzyme'
import expectJSX from 'expect-jsx'
import 'jest-fetch-mock'
import reactElementToJSXString from 'react-element-to-jsx-string'

expect.extend(expectJSX)

import AnimeList from '../../components/welcome/_anime_list'
import Anime from '../../components/welcome/_anime'
jest.unmock('../../components/welcome/_anime_list')

describe('AnimeListComponent', () => {
  it('DOMが出力されること', () => {
    const component = shallow(
      <AnimeList />
    )
    const anime1 = { id: 1, title: 'アニメタイトル', summary: 'アニメサマリ', wiki_url: 'https://wiki.com' }
    const anime2 = { id: 1, title: 'アニメタイトル2', summary: 'アニメサマリ2', wiki_url: 'https://wiki2.com' }
    component.setState({animes: [anime1, anime2]})

    let actualElement = component.single(reactElementToJSXString)
    let expectedElement = (
      <div className='animeListComponent'>
        <Anime anime={anime1} />
        <Anime anime={anime2} />
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
