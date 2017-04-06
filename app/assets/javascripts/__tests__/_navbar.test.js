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
        <div className="navbar-header">
          <Link activeClassName='active' className='navbar-brand' onlyActiveOnIndex to='/'>
            <div className='brand-image' />
          </Link>
        </div>
        <div className='collapse navbar-collapse'>
          <span />
        </div>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
