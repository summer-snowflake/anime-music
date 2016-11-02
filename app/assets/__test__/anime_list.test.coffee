window.React = require 'react'
window.R = React.DOM
jest.dontMock '../javascripts/components/anime_list.js.coffee'

AnimeList = require '../javascripts/components/anime_list.js.coffee'
{ shallow } = require 'enzyme'

describe('AnimeComponent', ->
  it('アニメ一覧が表示されること', ->
    tree = React.createElement(AnimeList, { url: 'api/animes' })
    anime_list = shallow(tree)
    anime_list.setState(
      animes: [{ id: 1, title: 'タイトル' }, { id: 2, title: 'タイトル2' }]
    )

    expect(anime_list.find('Anime').length).toEqual(2)
  )
)
