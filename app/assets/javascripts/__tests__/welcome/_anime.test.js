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
    const advertisement = { id: 1, body: '<a href=""></a>'}
    const season = { id: 1, phase: '1', name: 'シーズン名', anime: anime, melodies: [melody], movies: [], advertisements: [advertisement] }
    renderer.render(
      <Anime season={season} />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='animeComponent' id='season-1'>
        <div className="panel panel-default">
          <div className='panel-body'>
            <h2 className='title'>
              <span>
                {'アニメタイトル シーズン名 （第1期）'}
              </span>
            </h2>
            <div>
              <p className='summary'>
                 <div dangerouslySetInnerHTML={{ __html: 'アニメサマリ' }} />
              </p>
              <p className='pull-right'>
                <span className='label label-default link' onClick={jest.fn()}>
                  {'PR'}
                  <span className='glyphicon glyphicon-refresh' />
                </span>
              </p>
            </div>
            <hr className='clear' />
            <Melody melody={melody} />
          </div>
        </div>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
