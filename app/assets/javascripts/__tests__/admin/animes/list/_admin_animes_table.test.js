import React from 'react'
import expect from 'expect'
import { renderIntoDocument } from 'react-addons-test-utils'
import { shallow } from 'enzyme'
import expectJSX from 'expect-jsx'
import 'jest-fetch-mock'
import reactElementToJSXString from 'react-element-to-jsx-string'

expect.extend(expectJSX)

import AdminAnimesTable from '../../../../components/admin/animes/list/_admin_animes_table'
import AdminAnimeRow from '../../../../components/admin/animes/list/_admin_anime_row'
jest.unmock('../../../../components/admin/animes/list/_admin_animes_table')

describe('AdminAnimesTableComponent', () => {
  it('DOMが出力されること', () => {
    const component = shallow(
      <AdminAnimesTable />
    )
    const anime1 = { id: 1, title: 'アニメタイトル', summary: 'アニメサマリ', wiki_url: 'https://wiki.com' }
    const anime2 = { id: 1, title: 'アニメタイトル2', summary: 'アニメサマリ2', wiki_url: 'https://wiki2.com' }
    component.setState({animes: [anime1, anime2]})

    let actualElement = component.single(reactElementToJSXString)
    let expectedElement = (
      <div className='adminAnimesTableComponent'>
        <AdminAnimeRow anime={anime1} />
        <AdminAnimeRow anime={anime2} />
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
