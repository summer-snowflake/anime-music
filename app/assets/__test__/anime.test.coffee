jest.dontMock '../javascripts/components/anime.js.coffee'

React = require 'react'
Anime = require '../javascripts/components/anime.js.coffee'
{ shallow } = require 'enzyme'

describe('AnimeListComponent', ->
  it('一覧が表示されること', ->
    tree = React.createElement(Anime, { key: '1' }, 'タイトル')
    anime = shallow(tree)
    expect(anime.text()).toEqual('タイトル')
    expect(anime.find('div').length).toEqual(1)
    expect(tree.props.children).toBe('タイトル')
  )
)
