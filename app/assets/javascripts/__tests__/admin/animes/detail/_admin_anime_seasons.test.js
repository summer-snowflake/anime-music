import React from 'react'
import expect from 'expect'
import { renderIntoDocument } from 'react-addons-test-utils'
import { shallow } from 'enzyme'
import expectJSX from 'expect-jsx'
import 'jest-fetch-mock'
import reactElementToJSXString from 'react-element-to-jsx-string'

expect.extend(expectJSX)

import AdminAnimeSeasons from '../../../../components/admin/animes/detail/_admin_anime_seasons'
import AdminAnimeSeason from '../../../../components/admin/animes/detail/_admin_anime_season'
jest.unmock('../../../../components/admin/animes/detail/_admin_anime_seasons')

describe('AdminAnimeSeasonsComponent', () => {
  it('DOMが出力されること', () => {
    const season1 = { id: '1', phase: '1', name: 'アニメタイトルシーズン1', start_on: '2016-03-01', end_on: '2016-07-01' }
    const season2 = { id: '2', phase: '2', name: 'アニメタイトルシーズン2', start_on: '2017-01-01', end_on: '' }
    //component.setState({seasons: [season1, season2]})
    const component = shallow(
      <AdminAnimeSeasons seasons={[season1, season2]} />
    )

    let actualElement = component.single(reactElementToJSXString)
    let expectedElement = (
      <div className='adminAnimeSeasonsComponent'>
        <AdminAnimeSeason key={1} season={season1} />
        <AdminAnimeSeason key={2} season={season2} />
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
