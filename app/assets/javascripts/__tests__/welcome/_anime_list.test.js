import React from 'react'
import expect from 'expect'
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
    const season1 = { id: 1, phase: 1, name: 'シーズン名1', anime: anime1 }
    const season2 = { id: 2, phase: 2, name: 'シーズン名2', anime: anime2 }
    component.setState({seasons: [season1, season2]})

    let actualElement = component.single(reactElementToJSXString)
    let expectedElement = (
      <div className='animeListComponent'>
        <Anime handleDisplayAdvertisements={jest.fn()} season={season1} />
        <Anime handleDisplayAdvertisements={jest.fn()} season={season2} />
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
