import React from 'react'
import { shallow } from 'enzyme'
import App from './../components/app.js'
import Navbar from './../components/navbar.js'
jest.unmock('./../components/app.js')

describe('AnimeComponent', () => {
  it('トップ画面が表示されること', () => {
    const app = shallow(<App />)

    expect(app.find(Navbar).length).toEqual(1)
  })
})
