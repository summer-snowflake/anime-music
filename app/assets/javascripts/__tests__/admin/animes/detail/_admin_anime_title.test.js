import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-test-renderer/shallow'
import expectJSX from 'expect-jsx'
import 'jest-fetch-mock'

expect.extend(expectJSX)

import AdminAnimeTitle from '../../../../components/admin/animes/detail/_admin_anime_title'
import MessageBox from '../../../../components/common/_message_box'
import LoadingImage from '../../../../components/common/_loading_image'
jest.unmock('../../../../components/admin/animes/detail/_admin_anime_title')

describe('AdminAnimeDetailComponent', () => {
  it('propsに設定した値が出力されること', () => {
    let renderer = createRenderer()
    renderer.render(
      <AdminAnimeTitle airing={false} handleUpdateTitle={jest.fn()} title='アニメタイトル' />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='adminAnimeTitleComponent'>
        <div className="not-editing-title">
          <b className='panel-title'>{'アニメタイトル'}</b>
          <span className='link right-icon' onClick={jest.fn()}>
            <span className='glyphicon glyphicon-pencil' />
          </span>
        </div>
        <MessageBox message='' message_type='success' />
        <LoadingImage />
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
