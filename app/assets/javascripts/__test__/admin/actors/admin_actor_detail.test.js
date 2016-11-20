import React from 'react'
import AdminActorDetail from './../../../components/admin/actors/admin_actor_detail.jsx'
import { shallow } from 'enzyme'
jest.unmock('./../../../components/admin/actors/admin_actor_detail.jsx')

describe('AdminActorDetailComponent', () => {
  it('管理画面：声優詳細情報が表示されること', () => {
    const actor_detail = shallow(<AdminActorDetail url='/api/admin/actors/1' />)

    expect(actor_detail.find('div.panel').length).toEqual(1)
  })
})
