import React from 'react'
import AdminAnimeDetail from './../../../components/admin/animes/admin_anime_detail.js'
import { shallow } from 'enzyme'
jest.unmock('./../../../components/admin/animes/admin_anime_detail.js')

describe('AdminAnimeDetailComponent', () => {
  it('管理画面：アニメ詳細情報が表示されること', () => {
    const anime_detail = shallow(<AdminAnimeDetail url='/api/admin/animes/1' />)

    expect(anime_detail.find('div.panel').length).toEqual(1)
  })
})
