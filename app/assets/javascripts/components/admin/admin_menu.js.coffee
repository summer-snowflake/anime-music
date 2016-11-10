AdminMenu = React.createClass
  getInitialState: ->
    menus: [
      { url: '/', name: 'TOP' }
      { url: '/admin', name: '管理TOP' }
      { url: '/admin/animes', name: 'アニメ' }
      { url: '/admin/actors', name: '声優' }
      { url: '/admin/melodies', name: '音楽' }
    ]

  render: ->
    R.ul
      className: 'admin-menu'
      this.state.menus.map (menu, key) ->
        R.li
          key: key
          React.createElement(Link, to: 'admin', menu.name)

module.exports = AdminMenu
