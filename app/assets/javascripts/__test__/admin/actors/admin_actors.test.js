import React from 'react'
import { shallow } from 'enzyme'
import AdminActors from './../../../components/admin/actors/admin_actors.js'
import AdminActorsTable from './../../../components/admin/actors/admin_actors_table.js'
jest.unmock('./../../../components/admin/actors/admin_actors.js')

describe('AdminActorsComponent', () => {
  it('管理画面：声優の情報一覧が表示されること', () => {
    const admin_actors = shallow(<AdminActors />)

    expect(admin_actors.find(AdminActorsTable).length).toEqual(1)
  })
})
