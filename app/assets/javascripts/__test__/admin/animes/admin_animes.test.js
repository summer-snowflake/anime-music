import React from 'react'
import { shallow } from 'enzyme'
import AdminAnimes from './../../../components/admin/animes/admin_animes.js'
import AdminAnimesTable from './../../../components/admin/animes/admin_animes_table.js'
jest.unmock('./../../../components/admin/animes/admin_animes.js')

describe('AdminAnimesComponent', () => {
  it('管理画面：アニメ情報一覧画面が表示されること', () => {
    const admin_animes = shallow(<AdminAnimes />)

    expect(admin_animes.find(AdminAnimesTable).length).toEqual(1)
  })
})
