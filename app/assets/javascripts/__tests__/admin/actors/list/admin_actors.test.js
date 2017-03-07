import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import AdminActors from '../../../../components/admin/actors/list/admin_actors'
import AdminActorsTable from '../../../../components/admin/actors/list/_admin_actors_table'
jest.unmock('../../../../components/admin/actors/list/admin_actors')

describe('AdminActorsComponent', () => {
  let renderer = createRenderer()

  it('子コンポーネントが出力されること', () => {
    renderer.render(
      <AdminActors />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='adminActorsComponent'>
        <AdminActorsTable />
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
