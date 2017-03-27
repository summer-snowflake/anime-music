import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import expectJSX from 'expect-jsx'
import 'jest-fetch-mock'
import reactElementToJSXString from 'react-element-to-jsx-string'

expect.extend(expectJSX)

import AdminActorsTable from '../../../../components/admin/actors/list/_admin_actors_table'
import AdminActorRow from '../../../../components/admin/actors/list/_admin_actor_row'
import AdminActorNewForm from '../../../../components/admin/actors/list/_admin_actor_new_form'
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
        <AdminActorNewForm handleLoad={jest.fn()} />
        <AdminActorRow actor={actor1} handleLoad={jest.fn()} />
        <AdminActorRow actor={actor2} handleLoad={jest.fn()} />
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
