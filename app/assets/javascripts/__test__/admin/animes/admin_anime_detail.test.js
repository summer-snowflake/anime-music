import React from 'react'
import AdminAnimeDetail from './../../../components/admin/animes/admin_anime_detail.jsx'
import { shallow } from 'enzyme'
jest.unmock('./../../../components/admin/animes/admin_anime_detail.jsx')

describe('AdminAnimeDetailComponent', () => {
  it('管理画面：アニメ情報が表示されること', () => {
    const anime_detail = shallow(<AdminAnimeDetail url='/api/admin/animes/1' />)

    expect(anime_detail.find('div.panel').length).toEqual(1)
  })
})
