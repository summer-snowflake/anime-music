import React from 'react'
import AdminActorsTable from './../../../components/admin/actors/admin_actors_table.jsx'
import { shallow } from 'enzyme'
jest.unmock('./../../../components/admin/actors/admin_actors_table.jsx')

describe('AnimeListComponent', () => {
  it('アニメ情報一覧が表示されること', () => {
    const actors_list = shallow(<AdminActorsTable url='api/actors' />)

    actors_list.setState(
      { actors: [{ id: 1, name: '名前1' }, { id: 2, name: '名前2' }] }
    )
    expect(actors_list.find('AdminActorRow').length).toEqual(2)
  })
})
