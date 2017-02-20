import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import Admin from '../../components/admin/admin'
import AdminMenu from '../../components/admin/_admin_menu'
jest.unmock('../../components/admin/admin')

describe('AdminComponent', () => {
  let renderer = createRenderer()

  it('子コンポーネントが出力されること', () => {
    renderer.render(
      <Admin>{'dummy'}</Admin>
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='adminComponent'>
        <AdminMenu />
        {'dummy'}
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
