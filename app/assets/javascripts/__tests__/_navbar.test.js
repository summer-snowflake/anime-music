import React from 'react'
import expect from 'expect'
import { Link } from 'react-router'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import Navbar from '../components/_navbar'
jest.unmock('../components/_navbar')

describe('NavbarComponent', () => {
  let renderer = createRenderer()

  it('DOMが出力される', () => {
    renderer.render(
      <Navbar />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='navbarComponent'>
        <ul>
          <li><Link activeClassName='active' onlyActiveOnIndex to='/'>{'TOP'}</Link></li>
        </ul>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
