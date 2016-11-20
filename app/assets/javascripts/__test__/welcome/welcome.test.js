import React from 'react'
import { shallow } from 'enzyme'
import Welcome from './../../components/welcome/welcome.jsx'
import AnimeList from './../../components/welcome/anime_list.jsx'
jest.unmock('./../../components/welcome/welcome.jsx')

describe('AnimeComponent', () => {
  it('アニメ一覧画面が表示されること', () => {
    const welcome = shallow(<Welcome />)

    expect(welcome.find(AnimeList).length).toEqual(1)
  })
})
