import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import expectJSX from 'expect-jsx'
import 'jest-fetch-mock'
import reactElementToJSXString from 'react-element-to-jsx-string'

expect.extend(expectJSX)

import AdminActorTitle from '../../../../components/admin/actors/detail/_admin_actor_title'
import AdminActorDetail from '../../../../components/admin/actors/detail/_admin_actor_detail'
jest.unmock('../../../../components/admin/actors/detail/_admin_actor_detail')

describe('AdminActorDetailComponent', () => {
  it('表示', () => {
    const component = shallow(
      <AdminActorDetail actor_id='1' />
    )
    component.setState({actor: { id: 1, name: '声優 氏名' }})

    let actualElement = component.single(reactElementToJSXString)
    let expectedElement = (
      <div className='adminActorDetailComponent'>
        <div className='panel panel-default'>
          <div className='panel-body'>
            <AdminActorTitle ref='name' handleUpdateName={jest.fn()} name='声優 氏名' />
          </div>
        </div>
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
