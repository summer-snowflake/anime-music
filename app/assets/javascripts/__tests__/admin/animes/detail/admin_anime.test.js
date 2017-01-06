import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import AdminAnime from '../../../../components/admin/animes/detail/admin_anime'
import AdminAnimeDetail from '../../../../components/admin/animes/detail/_admin_anime_detail'
jest.unmock('../../../../components/admin/animes/detail/admin_anime')

describe('AdminAnimeComponent', () => {
  let renderer = createRenderer()
  const params = { animeId: 1 }

  it('子コンポーネントが出力されること', () => {
    renderer.render(
      <AdminAnime params={ params } />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='adminAnimeComponent'>
        <AdminAnimeDetail url='api/admin/animes/1' />
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})