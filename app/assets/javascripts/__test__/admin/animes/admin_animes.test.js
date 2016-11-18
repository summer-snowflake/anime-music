import React from 'react'
import { shallow } from 'enzyme'
import AdminAnimes from './../../../components/admin/animes/admin_animes.jsx'
import AdminAnimesTable from './../../../components/admin/animes/admin_animes_table.jsx'
jest.unmock('./../../../components/admin/animes/admin_animes.jsx')

describe('AdminAnimesComponent', () => {
  it('管理画面が表示されること', () => {
    const admin_animes = shallow(<AdminAnimes />)

    expect(admin_animes.find(AdminAnimesTable).length).toEqual(1)
  })
})
