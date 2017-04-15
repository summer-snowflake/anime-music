import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import Anime from '../../components/welcome/_anime'
import Melody from '../../components/welcome/_melody'
jest.unmock('../../components/welcome/_anime')

describe('AnimeComponent', () => {
  let renderer = createRenderer()

  it('propsに設定した値が出力される', () => {
    const anime = { title: 'アニメタイトル', summary: 'アニメサマリ' }
    const melody = { id: 1, kind: 'ed', title: 'エンディング曲'}
    const season = { id: 1, phase: '1', name: 'シーズン名', anime: anime, melodies: [melody] }
    renderer.render(
      <Anime season={season} />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='animeComponent'>
        <div className="panel panel-default">
          <div className='panel-body'>
            <div className='title'>
              {'アニメタイトル シーズン名 （第1期）'}
            </div>
            <div className='summary'>
              {'アニメサマリ'}
            </div>
            <Melody melody={melody} />
          </div>
        </div>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
