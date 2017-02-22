import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import { Link } from 'react-router'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'
import reactElementToJSXString from 'react-element-to-jsx-string'

expect.extend(expectJSX)

import AdminAnimeRow from '../../../../components/admin/animes/list/_admin_anime_row'
jest.unmock('../../../../components/admin/animes/list/_admin_anime_row')

describe('AdminAnimeRowComponent', () => {
  let renderer = createRenderer()

  it('propsに設定した値が出力される', () => {
    const anime = { id: 1, title: 'アニメタイトル', summary: 'アニメサマリ', wiki_url: 'https://wiki.com', picture: 'picture_url' }
    const component = shallow(
      <AdminAnimeRow anime={anime} />
    )
    //component.setState({anime: anime})

    let actualElement = component.single(reactElementToJSXString)
    let expectedElement = (
      <div className='media adminAnimeRowComponent' id='anime-1'>
        <div className='media-left'>
          <Link to='/admin/animes/1'>
            <img alt='アニメタイトル' className='media-object' src='picture_url' />
          </Link>
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
