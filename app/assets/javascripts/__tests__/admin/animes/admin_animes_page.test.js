import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import AdminAnimesPage from '../../../components/admin/animes/admin_animes_page'
jest.unmock('../../../components/admin/animes/admin_animes_page')

describe('AdminAnimesPageComponent', () => {
  let renderer = createRenderer()

  it('DOMが出力される', () => {
    renderer.render(
      <AdminAnimesPage />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='adminAnimesPageComponent' />
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
