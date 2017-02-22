import React from 'react'
import expect from 'expect'
import { renderIntoDocument } from 'react-addons-test-utils'
import { shallow } from 'enzyme'
import expectJSX from 'expect-jsx'
import 'jest-fetch-mock'
import reactElementToJSXString from 'react-element-to-jsx-string'

expect.extend(expectJSX)

import AdminActorsTable from '../../../../components/admin/actors/list/_admin_actors_table'
import AdminActorRow from '../../../../components/admin/actors/list/_admin_actor_row'
jest.unmock('../../../../components/admin/actors/list/_admin_actors_table')

describe('AdminActorsTableComponent', () => {
  it('DOMが出力されること', () => {
    const component = shallow(
      <AdminActorsTable url='api/admin/actors' />
    )
    const actor1 = { id: 1, name: '声優名1' }
    const actor2 = { id: 1, name: '声優名2' }
    component.setState({actors: [actor1, actor2]})

    let actualElement = component.single(reactElementToJSXString)
    let expectedElement = (
      <div className='adminActorsTableComponent'>
        <table className='table'>
          <tbody>
            <AdminActorRow actor={actor1} />
            <AdminActorRow actor={actor2} />
          </tbody>
        </table>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
