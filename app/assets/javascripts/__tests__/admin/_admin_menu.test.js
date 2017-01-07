import React from 'react'
import expect from 'expect'
import { Link } from 'react-router'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import AdminMenu from '../../components/admin/_admin_menu'
jest.unmock('../../components/admin/_admin_menu')

describe('AdminMenuComponent', () => {
  let renderer = createRenderer()

  it('DOMが出力される', () => {
    renderer.render(
      <AdminMenu />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='adminMenuComponent'>
        <ul role="nav">
          <li><Link activeClassName='active' onlyActiveOnIndex to="/admin">{'管理TOP'}</Link></li>
          <li><Link activeClassName='active' to="/admin/animes">{'アニメ'}</Link></li>
          <li><Link activeClassName='active' to="/admin/actors">{'声優'}</Link></li>
        </ul>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
