import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import expectJSX from 'expect-jsx'
import 'jest-fetch-mock'
import reactElementToJSXString from 'react-element-to-jsx-string'

expect.extend(expectJSX)

import AdminAnimeDetail from '../../../../components/admin/animes/detail/_admin_anime_detail'
import AdminAnimeTitle from '../../../../components/admin/animes/detail/_admin_anime_title'
import AdminAnimeThumbnail from '../../../../components/admin/animes/detail/_admin_anime_thumbnail'
import AdminAnimeBody from '../../../../components/admin/animes/detail/_admin_anime_body'
jest.unmock('../../../../components/admin/animes/detail/_admin_anime_detail')

describe('AdminAnimeDetailComponent', () => {
  it('設定した値が表示されること', () => {
    const component = shallow(
      <AdminAnimeDetail anime_id='1' />
    )
    component.setState({anime: { id: 1, title: 'アニメタイトル', summary: 'アニメサマリ', wiki_url: 'https://wiki.com', picture: 'https://picture.com' }})

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
                <AdminAnimeBody id={1} onLoadAnime={jest.fn()} summary='アニメサマリ' wiki_url='https://wiki.com' />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
