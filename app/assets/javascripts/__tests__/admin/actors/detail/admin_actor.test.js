import React from 'react'
import expect from 'expect'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import AdminActor from '../../../../components/admin/actors/detail/admin_actor'
import AdminActorDetail from '../../../../components/admin/actors/detail/_admin_actor_detail'
jest.unmock('../../../../components/admin/actors/detail/admin_actor')

describe('AdminActorComponent', () => {
  let renderer = createRenderer()
  const params = { actorId: 1 }

  it('子コンポーネントが出力されること', () => {
    renderer.render(
      <AdminActor params={params} />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <div className='adminActorComponent'>
        <AdminActorDetail actor_id={1} />
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
