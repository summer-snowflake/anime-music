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
        <h1>{'本日のアニソン'}</h1>
        <div className='col-md-9'>
          <AnimeList />
        </div>
        <div className='col-md-3 tiwtter-widget'>
          <div className='panel panel-default'>
            <a className='twitter-timeline' data-width='500' href='https://twitter.com/anison_time'>{'Tweets by anison_time'}</a>
          </div>
        </div>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
