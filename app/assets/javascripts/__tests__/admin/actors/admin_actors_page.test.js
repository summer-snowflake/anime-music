import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import AdminActorsPage from '../../../components/admin/actors/admin_actors_page'
jest.unmock('../../../components/admin/actors/admin_actors_page')

describe('AdminActorsPageComponent', () => {
  let renderer = createRenderer()

  it('DOMが出力される', () => {
    renderer.render(
      <AdminActorsPage>{'dummy'}</AdminActorsPage>
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='adminActorsPageComponent'>
        {'dummy'}
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
