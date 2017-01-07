import React from 'react'
import expect from 'expect'
import { renderIntoDocument } from 'react-addons-test-utils'
import { shallow } from 'enzyme'
import expectJSX from 'expect-jsx'
import fetch from 'jest-fetch-mock'
import reactElementToJSXString from 'react-element-to-jsx-string'

expect.extend(expectJSX)

import AdminAnimesTable from '../../../../components/admin/animes/list/_admin_animes_table'
import AdminAnimeRow from '../../../../components/admin/animes/list/_admin_anime_row'
jest.unmock('../../../../components/admin/animes/list/_admin_animes_table')

describe('AdminAnimesTableComponent', () => {
  it('state初期値が設定されていること', () => {
    const component = renderIntoDocument(
      <AdminAnimesTable url='api/admin/animes' />
    )
    expect(component.state.animes).toEqual([])
  })

  it('表示', () => {
    const component = shallow(
      <AdminAnimesTable url='api/admin/animes' />
    )
    const anime1 = { id: 1, title: 'アニメタイトル', summary: 'アニメサマリ', wiki_url: 'https://wiki.com' }
    const anime2 = { id: 1, title: 'アニメタイトル2', summary: 'アニメサマリ2', wiki_url: 'https://wiki2.com' }
    component.setState({animes: [anime1, anime2]})

    let actualElement = component.single(reactElementToJSXString)
    let expectedElement = (
      <div className='adminAnimesTableComponent'>
        <table className='table'>
          <tbody>
            <AdminAnimeRow anime={anime1} />
            <AdminAnimeRow anime={anime2} />
          </tbody>
        </table>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
