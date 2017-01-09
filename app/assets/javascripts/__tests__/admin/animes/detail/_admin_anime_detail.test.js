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
import AdminAnimeThumbnail from '../../../../components/admin/animes/detail/_admin_anime_thumbnail'
import AdminAnimeSeasons from '../../../../components/admin/animes/detail/_admin_anime_seasons'
jest.unmock('../../../../components/admin/animes/detail/_admin_anime_detail')

describe('AdminAnimeDetailComponent', () => {
  it('state初期値が設定されていること', () => {
    const component = renderIntoDocument(
      <AdminAnimeDetail url='api/admin/animes/1' />
    )
    expect(component.state.anime.title).toBe('')
    expect(component.state.anime.summary).toBe('')
    expect(component.state.anime.wiki_url).toBe('')
    expect(component.state.anime.seasons).toEqual([])
  })

  it('設定した値が表示されること', () => {
    const component = shallow(
      <AdminAnimeDetail url='api/admin/animes/1' />
    )
    const seasons = [{id: 1, phase: '1', name: 'アニメタイトルシーズン１'}]
    component.setState({anime: { id: 1, title: 'アニメタイトル', summary: 'アニメサマリ', wiki_url: 'https://wiki.com', picture: 'https://picture.com', seasons: seasons }})

    let actualElement = component.single(reactElementToJSXString)
    let expectedElement = (
      <div className='adminAnimeDetailComponent'>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <AdminAnimeTitle id={1} title='アニメタイトル' />
            <div className="row">
              <div className="col-xs-6 col-md-3">
                <AdminAnimeThumbnail id={1} picture='https://picture.com' title='アニメタイトル' />
              </div>
              <div className="col-xs-6 col-md-9">
                {'アニメサマリ'}
              </div>
            </div>
            <AdminAnimeSeasons seasons={seasons} />
          </div>
        </div>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
