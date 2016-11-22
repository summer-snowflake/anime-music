import React from 'react'
import { shallow } from 'enzyme'
import { Link } from 'react-router'
import Navbar from './../components/navbar.js'
jest.unmock('./../components/navbar.js')

describe('AnimeComponent', () => {
  it('メニューが表示されること', () => {
    const navbar = shallow(<Navbar />)

    expect(navbar.find(Link).length).toEqual(1)
  })
})
