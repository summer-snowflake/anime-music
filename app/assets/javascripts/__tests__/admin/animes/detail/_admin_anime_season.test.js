import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import AdminAnimeSeason from '../../../../components/admin/animes/detail/_admin_anime_season'
jest.unmock('../../../../components/admin/animes/detail/_admin_anime_season')

describe('AdminAnimeSeasonComponent', () => {
  it('propsに設定した値が表示されること', () => {
    let renderer = createRenderer()
    const season = { id: 1, phase: '1', name: 'アニメタイトルシーズン1', start_on: '2017-01-01', end_on: '' }
    renderer.render(
      <AdminAnimeSeason season={season} />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='adminAnimeSeasonComponent'>
        <div className='well well-lg'>
          {'第1期：'}
          {'2017-01-01〜：'}
          <b>{'アニメタイトルシーズン1'}</b>
        </div>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
