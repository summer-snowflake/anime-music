import React from 'react'
import expect from 'expect'
import { renderIntoDocument } from 'react-addons-test-utils'
import { shallow } from 'enzyme'
import expectJSX from 'expect-jsx'
import 'jest-fetch-mock'
import reactElementToJSXString from 'react-element-to-jsx-string'

expect.extend(expectJSX)

import AdminActorDetail from '../../../../components/admin/actors/detail/_admin_actor_detail'
jest.unmock('../../../../components/admin/actors/detail/_admin_actor_detail')

describe('AdminActorDetailComponent', () => {
  it('state初期値が設定されていること', () => {
    const component = renderIntoDocument(
      <AdminActorDetail url='api/admin/actors/1' />
    )
    expect(component.state.actor.name).toBe('')
  })

  it('表示', () => {
    const component = shallow(
      <AdminActorDetail url='api/admin/actors/1' />
    )
    component.setState({actor: { id: 1, name: '声優 氏名' }})

    let actualElement = component.single(reactElementToJSXString)
    let expectedElement = (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          {'声優 氏名'}
        </div>
        <div className='panel-body' />
      </div>
    )
    expect(actualElement).toEqualJSX(expectedElement)
  })
})
