import React from 'react'
import expect from 'expect'
import { renderIntoDocument } from 'react-addons-test-utils'
import { shallow } from 'enzyme'
import expectJSX from 'expect-jsx'
import 'jest-fetch-mock'
import reactElementToJSXString from 'react-element-to-jsx-string'

expect.extend(expectJSX)

import AdminAnimesThumbnail from '../../../../components/admin/animes/detail/_admin_anime_thumbnail'
jest.unmock('../../../../components/admin/animes/detail/_admin_anime_thumbnail')

describe('AdminAnimesTableComponent', () => {
  it('DOMが出力されること', () => {
    const component = shallow(
      <AdminAnimesThumbnail id='1' picture='api/admin/animes' title='アニメタイトル' />
    )

    let actualElement = component.single(reactElementToJSXString)
    let expectedElement = (
      <div className='adminAnimeThumbnailComponent'>
        <div className='col-xs-6 col-md-3'>
          <a href='#' className='thumbnail'>
            <img src='api/admin/animes' alt='アニメタイトル' />
          </a>
        </div>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
