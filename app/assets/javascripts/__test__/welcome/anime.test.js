import React from 'react'
import Anime from './../../components/welcome/anime.js'
import { shallow } from 'enzyme'
jest.unmock('./../../components/welcome/anime.js')

describe('AnimeComponent', () => {
  it('アニメ情報が表示されること', () => {
    var anime_row = { title: 'タイトル' }
    const anime = shallow(<Anime anime={anime_row} key='1' />)

    expect(anime.node.props.children.props.children).toEqual('タイトル')
    expect(anime.find('.panel').length).toEqual(1)
    expect(anime.find('.anime-title').length).toEqual(1)
  })
})
