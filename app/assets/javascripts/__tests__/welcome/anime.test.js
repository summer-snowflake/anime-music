import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import Anime from '../../components/welcome/anime'
jest.unmock('../../components/welcome/anime')

describe('AnimeComponent', () => {
  let renderer = createRenderer()

  it('propsに設定した値が出力される', () => {
    const anime = { title: 'アニメタイトル' }
    renderer.render(
      <Anime anime={anime} />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className="panel panel-default anime-title">
        <div className='panel-body'>
          {'アニメタイトル'}
        </div>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
