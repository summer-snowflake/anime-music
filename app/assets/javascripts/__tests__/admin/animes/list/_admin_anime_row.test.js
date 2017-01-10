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
      <div className='media adminAnimeRowComponent'>
        <div className='media-left'>
          <a href='#'>
            <img alt='アニメタイトル' className='media-object' src='' />
          </a>
        </div>
        <div className='media-body'>
          <h4 className='media-heading'>
            <Link to='/admin/animes/1'>
              {'アニメタイトル'}
            </Link>
          </h4>
          <div className='summary'>
            {'アニメサマリ'}
          </div>
          <div className='wiki-url'>
            <a href='https://wiki.com' target='_blank'>{'https://wiki.com'}</a>
          </div>
        </div>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
