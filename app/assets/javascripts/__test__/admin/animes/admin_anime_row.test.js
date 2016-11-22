import React from 'react'
import AdminAnimeRow from './../../../components/admin/animes/admin_anime_row.js'
import { shallow } from 'enzyme'
jest.unmock('./../../../components/admin/animes/admin_anime_row.js')

describe('AdminAnimeRowComponent', () => {
  it('管理画面：アニメ情報が表示されること', () => {
    var anime_row = { title: 'タイトル', summary: 'サマリー' }
    const anime = shallow(<AdminAnimeRow anime={anime_row} key='1' />)

    expect(anime.find('tr').length).toEqual(1)
    expect(anime.find('td').length).toEqual(4)
  })
})
