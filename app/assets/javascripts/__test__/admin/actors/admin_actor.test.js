import React from 'react'
import { shallow } from 'enzyme'
import AdminActor from './../../../components/admin/actors/admin_actor.jsx'
import AdminActorDetail from './../../../components/admin/actors/admin_actor_detail.jsx'
jest.unmock('./../../../components/admin/actors/admin_actor.jsx')

describe('AdminActorComponent', () => {
  it('管理画面：声優詳細画面が表示されること', () => {
    const admin_actor = shallow(<AdminActor params={{actorId: 1}}/>)

    expect(admin_actor.find(AdminActorDetail).length).toEqual(1)
  })
})
