import React from 'react'
import { shallow } from 'enzyme'
import AdminAnime from './../../../components/admin/animes/admin_anime.js'
import AdminAnimeDetail from './../../../components/admin/animes/admin_anime_detail.js'
jest.unmock('./../../../components/admin/animes/admin_anime.js')

describe('AdminAnimeComponent', () => {
  it('管理画面：アニメ詳細画面が表示されること', () => {
    const admin_anime = shallow(<AdminAnime params={{animeId: 1}}/>)

    expect(admin_anime.find(AdminAnimeDetail).length).toEqual(1)
  })
})
