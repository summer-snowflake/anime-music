import React from 'react'
import AdminActorRow from './../../../components/admin/actors/admin_actor_row.jsx'
import { shallow } from 'enzyme'
jest.unmock('./../../../components/admin/actors/admin_actor_row.jsx')

describe('AdminActorRowComponent', () => {
  it('アニメ情報が表示されること', () => {
    var actor_row = { title: 'タイトル', summary: 'サマリー' }
    const actor = shallow(<AdminActorRow actor={actor_row} key='1' />)

    expect(actor.find('tr').length).toEqual(1)
    expect(actor.find('td').length).toEqual(2)
  })
})
