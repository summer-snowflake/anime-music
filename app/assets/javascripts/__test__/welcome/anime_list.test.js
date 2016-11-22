import React from 'react'
import AnimeList from './../../components/welcome/anime_list.js'
import { shallow } from 'enzyme'
jest.unmock('./../../components/welcome/anime_list.js')

describe('AnimeListComponent', () => {
  it('アニメ情報一覧が表示されること', () => {
    const anime_list = shallow(<AnimeList url='/api/animes' />)

    anime_list.setState(
      { animes: [{ id: 1, title: 'タイトル' }, { id: 2, title: 'タイトル2' }] }
    )
    expect(anime_list.find('Anime').length).toEqual(2)
  })
})
