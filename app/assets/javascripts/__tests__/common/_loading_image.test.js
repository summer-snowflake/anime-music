import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import LoadingImage from '../../components/common/_loading_image'
jest.unmock('../../components/common/_loading_image')

describe('loadingImageComponent', () => {
  let renderer = createRenderer()

  it('出力される', () => {
    renderer.render(
      <LoadingImage />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='loadingImageComponent'>
        <div>{'Loading...'}</div>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
