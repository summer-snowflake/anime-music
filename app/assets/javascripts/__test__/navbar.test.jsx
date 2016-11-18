import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router'
import Navbar from './../../components/navbar.jsx'
jest.unmock('./../../components/navbar.jsx')

describe('AnimeComponent', () => {
  it('トップ画面が表示されること', () => {
    const navbar = shallow(<Navbar />)

    expect(navbar.find(Link).length).toEqual(1)
    expect(navbar.find(Link).first).toEqual('')
  })
})
