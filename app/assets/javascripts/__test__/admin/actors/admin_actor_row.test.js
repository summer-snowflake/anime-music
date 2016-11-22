import React from 'react'
import AdminActorRow from './../../../components/admin/actors/admin_actor_row.js'
import { shallow } from 'enzyme'
jest.unmock('./../../../components/admin/actors/admin_actor_row.js')

describe('AdminActorRowComponent', () => {
  it('管理画面：声優情報が表示されること', () => {
    var actor_row = { title: 'タイトル', summary: 'サマリー' }
    const actor = shallow(<AdminActorRow actor={actor_row} key='1' />)

    expect(actor.find('tr').length).toEqual(1)
    expect(actor.find('td').length).toEqual(1)
  })
})
