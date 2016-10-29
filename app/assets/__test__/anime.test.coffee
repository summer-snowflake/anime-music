window.React = require 'react'
window.R = React.DOM
window.Panel = require 'react-bootstrap/lib/Panel'
jest.dontMock '../javascripts/components/anime.js.coffee'

Anime = require '../javascripts/components/anime.js.coffee'
{ shallow } = require 'enzyme'

describe('AnimeComponent', ->
  it('アニメ情報が表示されること', ->
    tree = React.createElement(Anime, { key: '1' }, 'タイトル')
    anime = shallow(tree)

    expect(anime.find(Panel).length).toEqual(1)
    expect(anime.node.props.className).toEqual('anime-title')
    expect(anime.node.props.children.props.children).toEqual('タイトル')
    expect(anime.find('div').length).toEqual(1)
    expect(tree.props.children).toBe('タイトル')
  )
)
