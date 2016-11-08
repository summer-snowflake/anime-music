window.React = require 'react'
window.R = React.DOM
jest.dontMock '../components/anime.js.coffee'

Anime = require '../components/anime.js.coffee'
{ shallow } = require 'enzyme'

describe('AnimeComponent', ->
  it('アニメ情報が表示されること', ->
    tree = React.createElement(Anime, { key: '1' }, 'タイトル')
    anime = shallow(tree)

    expect(anime.find('.panel').length).toEqual(1)
    expect(anime.node.props.children.props.children).toEqual('タイトル')
    expect(anime.find('.anime-title').length).toEqual(1)
    expect(tree.props.children).toBe('タイトル')
  )
)
