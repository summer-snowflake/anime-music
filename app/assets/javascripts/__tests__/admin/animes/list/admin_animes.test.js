import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import AdminAnimes from '../../../../components/admin/animes/list/admin_animes'
import AdminAnimesTable from '../../../../components/admin/animes/list/_admin_animes_table'
jest.unmock('../../../../components/admin/animes/list/admin_animes')

describe('AdminAnimesComponent', () => {
  let renderer = createRenderer()

  it('子コンポーネントが出力されること', () => {
    renderer.render(
      <AdminAnimes />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='adminAnimesComponent'>
        <AdminAnimesTable />
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
