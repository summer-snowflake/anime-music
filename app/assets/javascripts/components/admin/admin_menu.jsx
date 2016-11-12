import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  getInitialState() {
    return { menus: [
      { url: '/', name: 'TOP' },
      { url: '/admin', name: '管理TOP' },
      { url: '/admin/animes', name: 'アニメ' },
      { url: '/admin/actors', name: '声優' },
      { url: '/admin/melodies', name: '音楽' }
    ] }
  },

  render() {
    return (
      <ul className='admin-menu'>
        <li><Link to="/admin">admin</Link></li>
      </ul>
    )
  }
})
