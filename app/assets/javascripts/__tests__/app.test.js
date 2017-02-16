import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import App from '../components/app'
import Navbar from '../components/_navbar'
jest.unmock('../components/app')

describe('AppComponent', () => {
  let renderer = createRenderer()

  it('子コンポーネントが出力されること', () => {
    renderer.render(
      <App>{'dummy'}</App>
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='appComponent'>
        <Navbar />
        {'dummy'}
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
