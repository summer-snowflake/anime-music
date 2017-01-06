import React from 'react'
import expect from 'expect'
import { Link } from 'react-router'
import { createRenderer } from 'react-addons-test-utils'
import expectJSX from 'expect-jsx'

expect.extend(expectJSX)

import AdminActorRow from '../../../../components/admin/actors/list/_admin_actor_row'
jest.unmock('../../../../components/admin/actors/list/_admin_actor_row')

describe('AdminActorRowComponent', () => {
  let renderer = createRenderer()

  it('propsに設定した値が出力される', () => {
    const actor = { id: 1, name: '声優 氏名' }
    renderer.render(
      <AdminActorRow actor={actor} />
    )
    let actualElement = renderer.getRenderOutput()
    let expectedElement = (
      <tr id='actor-1'>
        <td><Link to='/admin/actors/1'>{'声優 氏名'}</Link></td>
      </tr>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
