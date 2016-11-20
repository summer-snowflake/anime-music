import React from 'react'
import { shallow } from 'enzyme'
import App from './../components/app.jsx'
import Navbar from './../components/navbar.jsx'
jest.unmock('./../components/app.jsx')

describe('AnimeComponent', () => {
  it('トップ画面が表示されること', () => {
    const app = shallow(<App />)

    expect(app.find(Navbar).length).toEqual(1)
  })
})
