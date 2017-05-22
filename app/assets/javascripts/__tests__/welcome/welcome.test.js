import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-test-renderer/shallow'
import expectJSX from 'expect-jsx'
import 'jest-fetch-mock'

expect.extend(expectJSX)

import Welcome from '../../components/welcome/welcome'
import AnimeList from '../../components/welcome/_anime_list'
import Tweets from '../../components/menu/_tweets'
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
        <h1>{'放送中のアニメ'}</h1>
        <div className='col-md-9'>
          <AnimeList onDisplayAdvertisements={jest.fn()} />
        </div>
        <div className='col-md-3'>
          <div className="clear" />
          <Tweets />
        </div>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
