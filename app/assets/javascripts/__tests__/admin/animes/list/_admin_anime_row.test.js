import React from 'react'
import expect from 'expect'
import { Link } from 'react-router'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import AdminAnimeRow from '../../../../components/admin/animes/list/_admin_anime_row'
jest.unmock('../../../../components/admin/animes/list/_admin_anime_row')

describe('AdminAnimeRowComponent', () => {
  let renderer = createRenderer()

  it('propsに設定した値が出力される', () => {
    const anime = { id: 1, title: 'アニメタイトル', summary: 'アニメサマリ', wiki_url: 'https://wiki.com', picture: '' }
    renderer.render(
      <AdminAnimeRow anime={anime} />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <tr id='anime-1'>
        <td><Link to='/admin/animes/1'>{'アニメタイトル'}</Link></td>
        <td>{'アニメサマリ'}</td>
        <td>{'https://wiki.com'}</td>
        <td>{''}</td>
      </tr>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
