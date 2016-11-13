import React from 'react'
import AdminAnimeRow from './../../../components/admin/animes/admin_anime_row.jsx'
import { shallow } from 'enzyme'
jest.unmock('./../../../components/admin/animes/admin_anime_row.jsx')

describe('AdminAnimeRowComponent', () => {
  it('アニメ情報が表示されること', () => {
    var anime_row = { title: 'タイトル', summary: 'サマリー' }
    const anime = shallow(<AdminAnimeRow key='1' anime={anime_row} />)

    expect(anime.find('tr').length).toEqual(1)
    expect(anime.find('td').length).toEqual(5)
  })
})
