import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import Welcome from '../../components/welcome/welcome'
import AnimeList from '../../components/welcome/_anime_list'
jest.unmock('../../components/welcome/welcome')

describe('WelcomeComponent', () => {
  let renderer = createRenderer()

  it('子コンポーネントが出力される', () => {
    renderer.render(
      <Welcome />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='welcomeComponent'>
        <AnimeList url='api/animes' />
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
