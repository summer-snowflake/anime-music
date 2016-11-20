import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router'
import AdminMenu from './../../components/admin/admin_menu.jsx'
jest.unmock('./../../components/admin/admin_menu.jsx')

describe('AnimeComponent', () => {
  it('管理メニューが表示されること', () => {
    const admin_menu = shallow(<AdminMenu />)

    expect(admin_menu.find(Link).length).toEqual(3)
  })
})
