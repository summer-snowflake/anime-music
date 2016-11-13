import React from 'react'
import Anime from './../components/anime.jsx'
import { shallow } from 'enzyme'
jest.unmock('./../components/anime.jsx')

describe('AnimeComponent', () => {
  it('アニメ情報が表示されること', () => {
    var anime_row = { title: 'タイトル' }
    const anime = shallow(<Anime key='1' anime={anime_row} />)

    expect(anime.node.props.children.props.children).toEqual('タイトル')
    expect(anime.find('.panel').length).toEqual(1)
    expect(anime.find('.anime-title').length).toEqual(1)
  })
})
