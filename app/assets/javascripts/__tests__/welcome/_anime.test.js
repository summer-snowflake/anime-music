import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-test-renderer/shallow'
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
    const season = { id: 1, phase: '1', name: 'シーズン名', anime: anime, melodies: [melody], movies: [], advertisements: [{id: 1, body: '<a href=""></a>'}] }
    renderer.render(
      <Anime season={season} />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='animeComponent' id='season-1'>
        <div className="panel panel-default">
          <div className='panel-body'>
            <h2 className='title'>
              {'アニメタイトル シーズン名 （第1期）'}
            </h2>
            <p className='summary'>
              {'アニメサマリ'}
            </p>
            <hr />
            <Melody melody={melody} />
            <div className='link clear' onClick={jest.fn()}>
              <span className='glyphicon glyphicon-chevron-right' />
              <span className='show-movie-link'>{'視聴する'}</span>
            </div>
          </div>
        </div>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
