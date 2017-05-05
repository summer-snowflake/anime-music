import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-test-renderer/shallow'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import AdminTopPage from '../../../components/admin/top/admin_top_page'
jest.unmock('../../../components/admin/top/admin_top_page')

describe('AdminTopPageComponent', () => {
  let renderer = createRenderer()

  it('DOMが出力される', () => {
    renderer.render(
      <AdminTopPage />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='adminTopPageComponent'>
        {'Admin Top'}
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
