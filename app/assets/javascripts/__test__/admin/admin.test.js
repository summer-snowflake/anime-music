import React from 'react'
import { shallow } from 'enzyme'
import Admin from './../../components/admin/admin.jsx'
import AdminMenu from './../../components/admin/admin_menu.jsx'
jest.unmock('./../../components/admin/admin.jsx')

describe('AnimeComponent', () => {
  it('管理画面が表示されること', () => {
    const admin = shallow(<Admin />)

    expect(admin.find(AdminMenu).length).toEqual(1)
  })
})
