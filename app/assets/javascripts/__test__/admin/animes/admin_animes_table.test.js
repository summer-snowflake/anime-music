import React from 'react'
import AdminAnimesTable from './../../../components/admin/animes/admin_animes_table.jsx'
import { shallow } from 'enzyme'
jest.unmock('./../../../components/admin/animes/admin_animes_table.jsx')

describe('AnimeListComponent', () => {
  it('管理画面：アニメ情報一覧が表示されること', () => {
    const anime_list = shallow(<AdminAnimesTable url='api/animes' />)

    anime_list.setState(
      { animes: [{ id: 1, title: 'タイトル' }, { id: 2, title: 'タイトル2' }] }
    )
    expect(anime_list.find('AdminAnimeRow').length).toEqual(2)
  })
})
